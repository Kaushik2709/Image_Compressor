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
// ✅ Enable CORS only for localhost:8080
app.use(cors({
    origin: process.env.NODE_ENV === "production"
        ? "https://nologin-imagecompressor.onrender.com"
        : "http://localhost:8080",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
}));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Replace the previous path logic with this:
const projectRoot = path.join(__dirname, "..");
// Path to the frontend dist folder from the project root
const frontendPath = path.join(projectRoot, "image_compressor_frontend", "dist");
app.use(express.static(frontendPath));
app.get(/^\/(?!api).*/, (req, res) => {
    // This will now correctly resolve to: /opt/render/project/src/image_compressor_frontend/dist/index.html
    res.sendFile(path.join(frontendPath, "index.html"));
});
// ✅ Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/file", Imagerouter);
const totalCPUs = os.cpus().length;
if (cluster.isPrimary) {
    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
    // console.log(`Primary ${process.pid} is running`);
}
else {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}
