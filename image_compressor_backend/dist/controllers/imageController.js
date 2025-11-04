import sharp from "sharp";
export const ImageControllers = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        const quality = Math.max(1, Math.min(100, parseInt(req.body.quality || "80")));
        const maxWidth = req.body.maxWidth ? parseInt(req.body.maxWidth) : null;
        const format = (req.body.format || "webp").toLowerCase();
        let pipeline = sharp(req.file.buffer);
        if (maxWidth) {
            pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
        }
        // Apply format + compression
        if (format === "jpeg" || format === "jpg") {
            pipeline = pipeline.jpeg({ quality });
        }
        else if (format === "png") {
            pipeline = pipeline.png({ compressionLevel: 9 });
        }
        else if (format === "avif") {
            pipeline = pipeline.avif({ quality });
        }
        else {
            pipeline = pipeline.webp({ quality });
        }
        // Process image and get buffer
        const outputBuffer = await pipeline.toBuffer();
        // Set response headers
        res.set("Content-Type", `image/${format === "jpg" ? "jpeg" : format}`);
        res.send(outputBuffer);
    }
    catch (error) {
        console.error("Error while processing image:", error);
        res.status(500).json({ error: "Image processing failed" });
    }
};
