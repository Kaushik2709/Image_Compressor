import { Hero } from "@/components/Hero";
import { UploadSection } from "@/components/UploadSection";
import { CompressionSettings } from "@/components/CompressionSettings";
import { PreviewSection } from "@/components/PreviewSection";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { useState } from "react";

const Index = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState("");
  const [resultBlob, setResultBlob] = useState(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [quality, setQuality] = useState(80);
  const [maxWidth, setMaxWidth] = useState(1200);
  const [format, setFormat] = useState("");
  
  // now i have data in file preview status resultBob originalsize compressed size quality and maxwidth

  return (
    <div className="min-h-screen">
      <Hero />
      <UploadSection
        setSelectedFile={setFile}
        setOriginalSize={setOriginalSize}
        setPreview={setPreview}
        setResultBlob={setResultBlob}
        setCompressedSize={setCompressedSize}
        setStatus={setStatus}
      />
      <CompressionSettings
        setMaxWidth={setMaxWidth}
        maxWidth={maxWidth}
        quality={quality}
        setQuality={setQuality}
        format ={format}
        setFormat={setFormat}
        file={file}
        setPreview={setPreview}
        setStatus={setStatus}
        setResultBlob={setResultBlob}
        setCompressedSize = {setCompressedSize}
      />
      <PreviewSection 
        preview={preview}
        resultBlob={resultBlob}
        originalSize={originalSize}
        compressedSize={compressedSize}
      />
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
