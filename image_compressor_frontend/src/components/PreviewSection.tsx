import { useEffect, useState } from "react";
import { Download, ArrowRight, FileImage } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const PreviewSection = ({ resultBlob, preview ,originalSize,compressedSize}) => {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);


  useEffect(() => {
    if (resultBlob) {
      const url = URL.createObjectURL(resultBlob);
      
      setBlobUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setBlobUrl(null);
    }
  }, [resultBlob]);

 
  
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Preview & Compare</h2>
          <p className="text-muted-foreground">See the difference before and after compression</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Before */}
          <Card className="p-6 shadow-card">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"> 
                  <FileImage className="w-5 h-5 text-muted-foreground" />
                  <h3 className="font-semibold">Original</h3>
                </div>
                <span className="text-sm text-muted-foreground font-mono">{(originalSize/1024).toFixed(1)}KB</span>
              </div>

              <div className="aspect-video rounded-lg bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center border-2 border-dashed border-border">
                {preview ? (
                  <img src={preview} alt="Original preview" className="rounded-lg max-h-full max-w-full" />
                ) : (
                  <div className="text-center space-y-2">
                    <FileImage className="w-12 h-12 mx-auto text-muted-foreground/50" />
                    <p className="text-muted-foreground text-sm">No image selected</p>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* After */}
          <Card className="p-6 shadow-card border-2 border-primary/30">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileImage className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Compressed</h3>
                </div>
                <span className="text-sm font-mono text-primary">{(compressedSize/1024).toFixed(1)}KB</span>
              </div>

              <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center border-2 border-primary/30">
                {blobUrl ? (
                  <img src={blobUrl} alt="Compressed preview" className="rounded-lg max-h-full max-w-full" />
                ) : (
                  <div className="text-center space-y-2">
                    <FileImage className="w-12 h-12 mx-auto text-primary/50" />
                    <p className="text-primary/60 text-sm">No compressed image</p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Button
            size="lg"
            className="shadow-glow"
            disabled={!blobUrl}
            onClick={() => {
              if (blobUrl) {
                const a = document.createElement("a");
                a.href = blobUrl;
                a.download = "compressed-image.jpg";
                a.click();
              }
            }}
          >
            <Download className="mr-2 h-5 w-5" />
            Download Compressed Image
          </Button>
        </div>
      </div>
    </section>
  );
};
 