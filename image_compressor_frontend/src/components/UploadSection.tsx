import { useState } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

export const UploadSection = ({
  setSelectedFile,
  setOriginalSize,
  setPreview,
  setResultBlob,
  setCompressedSize,
  setStatus,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (e: any) => {
    const f = e.target.files[0];
    if (!f) return;

    setSelectedFile(f);
    setOriginalSize(f.size);
    setPreview(URL.createObjectURL(f));
    setResultBlob(null);
    setCompressedSize(0);
    setStatus("");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      setOriginalSize(file.size);
      setPreview(URL.createObjectURL(file));
      setResultBlob(null);
      setCompressedSize(0);
      setStatus("");
    }
  };

  return (
    <section id="upload-section" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card
          className={`p-8 border-2 border-dashed transition-all duration-300 shadow-card cursor-pointer ${
            isDragging
              ? "border-primary bg-primary/10"
              : "border-border hover:border-primary/50"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => document.getElementById("fileUpload")?.click()}
        >
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
              <Upload className="w-12 h-12 text-primary-foreground" />
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold">
                {isDragging ? "Drop image here" : "Drop your images here"}
              </h2>
              <p className="text-muted-foreground">
                or click to browse from your device
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ImageIcon className="w-4 h-4" />
              <span>Supports: JPG, PNG, WebP, GIF</span>
            </div>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="fileUpload"
              onChange={handleFile}
            />

            <div className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium hover:shadow-glow transition-all duration-300">
              Click to Drop Image
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
