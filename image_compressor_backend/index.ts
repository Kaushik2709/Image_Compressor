import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import sharp from "sharp";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { Imagerouter } from "./routes/imageRoutes.ts";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Enable CORS only for localhost:8080
app.use(
  cors({
    origin: "http://localhost:8080",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// ✅ Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/file", Imagerouter);

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
