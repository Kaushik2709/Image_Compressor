import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-compression.jpg";

export const Hero = () => {
  const scrollToUpload = () => {
    document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'var(--gradient-secondary)',
        }}
      />
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="container mx-auto px-4 z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground">
            Compress Images <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">Without Losing Quality and Login</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Reduce file sizes by up to 90% while maintaining perfect visual quality. 
            Fast, free, and easy to use.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              onClick={scrollToUpload}
              className="text-lg px-8 py-6 shadow-glow hover:shadow-[0_15px_50px_-15px_hsl(var(--primary)/0.4)] transition-all duration-300"
            >
              <Upload className="mr-2 h-5 w-5" />
              Start Compressing
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6"
            >
              Learn More
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-3xl mx-auto">
            <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
              <div className="text-3xl font-bold text-primary mb-2">90%</div>
              <div className="text-sm text-muted-foreground">Size Reduction</div>
            </div>
            <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Quality Preserved</div>
            </div>
            <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
              <div className="text-3xl font-bold text-primary mb-2">Free</div>
              <div className="text-sm text-muted-foreground">No Limits</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
