import { Button } from "@/components/ui/button";
import { Shield, Award, Zap } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[80vh] flex items-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-glow/80" />
      </div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-4xl">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-12 h-1 bg-accent rounded-full" />
            <span className="text-primary-foreground/90 font-medium">Premium HVAC Solutions</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Clean Air
            <span className="block text-accent">Made Simple</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl leading-relaxed">
            Professional-grade air filters and HVAC supplies delivered to your door. 
            Trust AirCare Supply Co for cleaner, healthier indoor environments.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button variant="accent" size="lg" className="text-lg px-8 py-6">
              Shop Products
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20">
              Learn More
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-8 text-primary-foreground/80">
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6" />
              <span className="font-medium">Certified Quality</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-6 h-6" />
              <span className="font-medium">Industry Leading</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-6 h-6" />
              <span className="font-medium">Fast Delivery</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;