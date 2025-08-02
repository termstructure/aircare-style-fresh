import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">A</span>
              </div>
              <span className="text-xl font-bold">AirCare Supply Co</span>
            </div>
            <p className="text-background/70 mb-4 leading-relaxed">
              Your trusted partner for quality HVAC supplies and air filtration solutions. 
              Founded in 2025 to make clean air simple and accessible.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
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
            <h3 className="text-lg font-semibold mb-4">Brands</h3>
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
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-background/90">Charlotte, NC</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-background/90">support@aircaresupplyco.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 text-center">
          <p className="text-background/70 text-sm">
            © {currentYear} AirCare Supply Co. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;