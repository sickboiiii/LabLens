const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          {/* Disclaimer */}
          <div className="bg-warning-light border border-warning/20 rounded-radius p-4 max-w-2xl mx-auto">
            <p className="text-sm text-foreground font-medium">
              ⚠️ <strong>Important:</strong> LabLens is for educational purposes only and does not provide medical advice, diagnosis, or treatment. 
              Always consult with a qualified healthcare professional for medical decisions.
            </p>
          </div>
          
          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a 
              href="#privacy" 
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a 
              href="#contact" 
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Contact
            </a>
            <a 
              href="#terms" 
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Terms of Service
            </a>
          </div>
          
          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            © 2024 LabLens. All rights reserved. Made with care for your health understanding.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;