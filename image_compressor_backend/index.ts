import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import sharp from "sharp";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path, { dirname } from "path";
import { Imagerouter } from "./routes/imageRoutes.ts";
import cors from "cors";
import cluster from "cluster";
import os from "os";
import { fileURLToPath } from "url";

dotenv.config();

// --- FIX FOR __dirname IN ES MODULES ---
// 1. Get the file path URL
// 2. Convert the URL to a standard file path string
// 3. Extract the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// --- END FIX ---

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Enable CORS only for localhost:8080
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

// console.log(fileURLToPath(import.meta.url)); // Removed console.log for cleaner code
const frontendPath = path.join(__dirname, "../image_compressor_frontend/dist"); // DELETE
app.use(express.static(frontendPath)); // DELETE
app.get(/^\/(?!api).*/, (req, res) => {
  // DELETE
  res.sendFile(path.join(frontendPath, "index.html")); // DELETE
}); // DELETE
// ✅ Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Use the image processing router for /file routes
app.use("/file", Imagerouter);

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
