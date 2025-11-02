import { Shield, Zap, Globe, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Compress your images in seconds with our optimized algorithm"
  },
  {
    icon: Shield,
    title: "Quality Preserved",
    description: "Advanced compression maintains visual quality while reducing file size"
  },
  {
    icon: Lock,
    title: "100% Private",
    description: "All processing happens in your browser. Your images never leave your device"
  },
  {
    icon: Globe,
    title: "Works Everywhere",
    description: "Compatible with all modern browsers. No installation required"
  }
];

export const Features = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Our Compressor?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The fastest and most efficient way to optimize your images
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
