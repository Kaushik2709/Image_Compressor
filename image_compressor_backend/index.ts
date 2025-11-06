import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import sharp from "sharp";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { Imagerouter } from "./routes/imageRoutes.ts";
import cors from "cors";
import cluster from "cluster";
import os from "os";
import { fileURLToPath } from "url";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

// ✅ Enable CORS only for localhost:8080

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://image-compressor-frontends.onrender.com"
        : "http://localhost:8080",

    methods: ["GET", "POST", "PUT", "DELETE"],

    allowedHeaders: ["Content-Type"],
  })
);

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// Replace the previous path logic with this:

const frontendPath = path.join(
  __dirname,
  "../",
  "image_compressor_frontend",
  "dist"
);

app.use(express.static(frontendPath));

app.get(/^\/(?!api).*/, (req, res) => {
  // This will now correctly resolve to: /project-root/image_compressor_frontend/dist/index.html

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
} else {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}
