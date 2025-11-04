import express from "express";
import multer from "multer";
import { ImageControllers } from "../controllers/imageController.js";
const Imagerouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
Imagerouter.post("/compress", upload.single("file"), ImageControllers);
export { Imagerouter };
