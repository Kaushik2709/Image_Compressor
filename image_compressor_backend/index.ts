import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import sharp from "sharp";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path, { dirname } from "path";
import { Imagerouter } from "./routes/imageRoutes.ts"; // ✅ must end with .js when using NodeNext
import cors from "cors";
import cluster from "cluster";
import os from "os";
import { fileURLToPath } from "url";

dotenv.config();

// --- FIX FOR __dirname IN ES MODULES ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// --- END FIX ---

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Enable CORS for allowed origins
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://nologin-imagecompressor.onrender.com"
        : "http://localhost:8080",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// ✅ Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Use the image processing router for /file routes
app.use("/file", Imagerouter);

// ✅ Serve frontend (React) build in production
if (process.env.NODE_ENV === "production") {
  // ✅ In Render, the frontend is one level above the backend
  let frontendPath = path.resolve(__dirname, "../image_compressor_frontend/dist");

  // ✅ If that doesn’t exist (local setup case), try relative local path
  if (!fs.existsSync(frontendPath)) {
    frontendPath = path.resolve(__dirname, "../../image_compressor_frontend/dist");
  }

  console.log("✅ Serving frontend from:", frontendPath);

  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    const indexFile = path.join(frontendPath, "index.html");
    console.log("🎯 Sending file:", indexFile);
    res.sendFile(indexFile);
  });
}


// 🚀 Cluster setup for multi-core performance
const totalCPUs = os.cpus().length;
if (cluster.isPrimary) {
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}
