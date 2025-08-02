import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-foreground text-background py-6 sm:py-8 md:py-12 lg:py-16">
      <div className="container mx-auto">
        {/* Mobile Compact Layout */}
        <div className="block md:hidden">
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {/* Company Info - Mobile */}
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-6 h-6 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">A</span>
                </div>
                <span className="text-sm sm:text-base font-bold">AirCare Supply Co</span>
              </div>
              <p className="text-background/70 text-xs leading-relaxed mb-3">
                Quality HVAC supplies and air filtration solutions.
              </p>
            </div>
            
            {/* Combined Links & Contact - Mobile */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 text-sm">
              <div>
                <h3 className="text-sm font-semibold mb-2">Links</h3>
                <ul className="space-y-1">
                  <li>
                    <Link to="/" className="text-background/70 hover:text-primary transition-colors py-1 block min-h-touch">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/air-filters" className="text-background/70 hover:text-primary transition-colors py-1 block min-h-touch">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-background/70 hover:text-primary transition-colors py-1 block min-h-touch">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold mb-2">Contact</h3>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-primary flex-shrink-0" />
                    <span className="text-background/90">Charlotte, NC</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Mail className="w-3 h-3 text-primary flex-shrink-0" />
                    <span className="text-background/90 break-all">support@aircaresupplyco.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 xl:gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">A</span>
              </div>
              <span className="text-base sm:text-lg lg:text-xl font-bold">AirCare Supply Co</span>
            </div>
            <p className="text-background/70 mb-4 leading-relaxed text-sm lg:text-base">
              Your trusted partner for quality HVAC supplies and air filtration solutions. 
              Founded in 2025 to make clean air simple and accessible.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-background/70 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/air-filters" className="text-background/70 hover:text-primary transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-background/70 hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-background/70 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-background/70 hover:text-primary transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-background/70 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-4">Brands</h3>
            <ul className="space-y-2">
              {[
                { name: "3M Filtrete", param: "3M Filtrete" },
                { name: "HDX", param: "HDX" },
                { name: "Honeywell", param: "Honeywell" },
                { name: "FilterBuy", param: "FilterBuy" }
              ].map((brand) => (
                <li key={brand.name}>
                  <Link 
                    to={`/air-filters?brand=${encodeURIComponent(brand.param)}`} 
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {brand.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2 lg:space-x-3">
                <MapPin className="w-4 h-4 lg:w-5 lg:h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-background/90 text-sm lg:text-base">Charlotte, NC</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 lg:space-x-3">
                <Mail className="w-4 h-4 lg:w-5 lg:h-5 text-primary flex-shrink-0" />
                <p className="text-background/90 text-sm lg:text-base break-words">support@aircaresupplyco.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-6 pt-4 md:mt-12 md:pt-8 text-center">
          <p className="text-background/70 text-xs md:text-sm">
            © {currentYear} AirCare Supply Co. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;