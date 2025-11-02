import { Github, Twitter, Heart, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-border">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              ImageCompress
            </h3>
            <p className="text-sm text-muted-foreground">
              The best free tool to compress your images without losing quality.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="https://github.com/Kaushik2709" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Connect</h4>
            <div className="flex gap-4">
              <a href="https://github.com/Kaushik2709" className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="www.linkedin.com/in/kaushik-mukherjee-1b2a42242" className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2025 ImageCompress. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <a href="https://github.com/Kaushik2709" className="text-blue-600 hover:underline">Kaushik2709</a> by developers
          </p>
        </div>
      </div>
    </footer>
  );
};
