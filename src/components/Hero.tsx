import { Button } from "@/components/ui/button";
import { Shield, Award, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[68vh] flex items-center bg-gradient-subtle">
      
      {/* Content */}
      <div className="relative container mx-auto py-section-fluid-lg">
        <div className="max-w-6xl mx-auto text-center">
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-foreground mb-8 leading-[0.85] tracking-tight">
            Clean Air
            <span className="block bg-gradient-accent bg-clip-text text-transparent">Made Simple</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-body text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Quality air filters and helpful guidance to maintain better indoor air quality. 
            Simple solutions for your home.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-16">
            <Button variant="hero" size="lg" className="px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-bold min-h-touch" asChild>
              <Link to="/air-filters">Shop Air Filters</Link>
            </Button>
            <Button variant="outline" size="lg" className="px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold min-h-touch" asChild>
              <Link to="/faq">Learn More</Link>
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 text-muted-foreground">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-accent/10 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-accent" />
              </div>
              <span className="font-semibold text-sm sm:text-base md:text-lg">Quality Products</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-accent/10 rounded-full flex items-center justify-center">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-accent" />
              </div>
              <span className="font-semibold text-sm sm:text-base md:text-lg">Helpful Service</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-accent/10 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-accent" />
              </div>
              <span className="font-semibold text-sm sm:text-base md:text-lg">Fast Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;