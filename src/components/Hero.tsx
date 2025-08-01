import { Button } from "@/components/ui/button";
import { Shield, Award, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[68vh] flex items-center bg-gradient-subtle">
      
      {/* Content */}
      <div className="relative container mx-auto px-6 py-24">
        <div className="max-w-6xl mx-auto text-center">
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black text-foreground mb-8 leading-[0.85] tracking-tight">
            Clean Air
            <span className="block bg-gradient-accent bg-clip-text text-transparent">Made Simple</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl font-body text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Premium air filters and HVAC solutions for modern homes. 
            Breathe cleaner, live better.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button variant="hero" size="lg" className="text-lg font-bold" asChild>
              <Link to="/air-filters">Shop Air Filters</Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg font-semibold" asChild>
              <Link to="/faq">Learn More</Link>
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 text-muted-foreground">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent/10 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
              </div>
              <span className="font-semibold text-sm sm:text-base">Certified Quality</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent/10 rounded-full flex items-center justify-center">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
              </div>
              <span className="font-semibold text-sm sm:text-base">Industry Leading</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent/10 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
              </div>
              <span className="font-semibold text-sm sm:text-base">Fast Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;