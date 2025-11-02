import { Settings, Zap, FileImage } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface CompressionSettingsProps {
  setMaxWidth: (value: number) => void;
  maxWidth: number;
  quality: number;
  format: string;
  setQuality: (value: number) => void;
  setFormat: (value: string) => void;
  file: File | null;
  setPreview: (value: string) => void;
  setStatus: (value: string) => void;
  setResultBlob: (value: string) => void;
  setCompressedSize: (value: number) => void;
}

export const CompressionSettings = ({
  setMaxWidth,
  maxWidth,
  quality,
  setQuality,
  format,
  setFormat,
  file,
  setPreview,
  setStatus,
  setResultBlob,
  setCompressedSize,
}: CompressionSettingsProps) => {
  const handleWidthChange = (value: number[]) => {
    setMaxWidth(value[0]);
  };

  const handleQualityChange = (value: number[]) => {
    setQuality(value[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    fd.append("quality", String(quality));
    fd.append("maxWidth", String(maxWidth));
    //
    fd.append("uploadToSupabase", "false");

    try {
      const res = await fetch("http://localhost:4000/file/compress", {
        method: "POST",
        body: fd,
      });
      const blob = await res.blob();
      setResultBlob(blob);
      setCompressedSize(blob.size);
      setStatus("compression succesful!");
    } catch (error) {
      console.error(error);
      setStatus("Error: " + (error as Error).message);
    }
  };

  const formats = ["JPG", "PNG", "WebP", "AVIF"];

  return (
    <section className="py-12 px-4 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <Card className="p-8 shadow-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Settings className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold">Compression Settings</h2>
          </div>

          <div className="space-y-8">
            {/* Width */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Max Width</Label>
                <span className="text-sm text-muted-foreground font-mono">
                  {maxWidth}px
                </span>
              </div>
              <Slider
                value={[maxWidth]}
                onValueChange={handleWidthChange}
                min={100}
                max={1200}
                step={1}
                className="w-full"
              />

              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Quality</Label>
                <span className="text-sm text-muted-foreground font-mono">
                  {quality}%
                </span>
              </div>
              <Slider
                value={[quality]}
                onValueChange={handleQualityChange}
                min={10}
                max={100}
                step={1}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">
                Higher quality = larger file size. We recommend 80–90% for best
                results.
              </p>
            </div>

            {/* Format */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileImage className="w-4 h-4 text-primary" />
                <Label className="text-base font-medium">Output Format</Label>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {formats.map((f) => (
                  <Button
                    key={f}
                    variant="outline"
                    onClick={() => setFormat(f)} // 🟢 update state
                    className={`border-2 ${
                      format === f
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    {f}
                  </Button>
                ))}
              </div>

              <p className="text-sm text-muted-foreground">
                Choose the output format for your compressed images
              </p>
            </div>
            <div className="flex items-center justify-center">
              <Button onClick={handleUpload}>Click to Compress Image</Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
