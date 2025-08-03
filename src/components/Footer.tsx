import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-foreground text-background py-4 md:py-6">
      <div className="container mx-auto text-center">
        <p className="text-background/70 text-xs md:text-sm">
          © {currentYear} AirCare Supply Co. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;