import dotenv from "dotenv";
import express from "express";
import path from "path";
import { Imagerouter } from "./routes/imageRoutes.js";
import cors from "cors";
import cluster from "cluster";
import os from "os";
import { fileURLToPath } from "url";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
// Configure CORS origin via env var (FRONTEND_URL). Falls back to localhost during development.
const frontendOrigin = process.env.FRONTEND_URL || (process.env.NODE_ENV === "production" ? undefined : "http://localhost:8080");
app.use(cors({
    origin: frontendOrigin,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
}));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Optional static serving of the frontend build. Set SERVE_STATIC=true to enable.
if (process.env.SERVE_STATIC === "true") {
    const frontendPath = path.join(__dirname, "../", "image_compressor_frontend", "dist");
    app.use(express.static(frontendPath));
    app.get(/^\/(?!api).*/, (req, res) => {
        // Serve the frontend app for non-API routes
        res.sendFile(path.join(frontendPath, "index.html"));
    });
}
// ✅ Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/file", Imagerouter);
const totalCPUs = os.cpus().length;
const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
};
// Enable clustering only when explicitly requested via ENABLE_CLUSTER=true.
// On Render (production), leave clustering disabled and let the platform scale instances.
if (process.env.ENABLE_CLUSTER === "true" && cluster.isPrimary) {
    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
}
else {
    startServer();
}
