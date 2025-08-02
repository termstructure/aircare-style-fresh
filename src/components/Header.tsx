import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Cart from "@/components/Cart";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import logo from "@/assets/logo.png";

const Header = () => {
  const { user, signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-card/90 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden">
              <img src={logo} alt="AirCare Supply Co Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-foreground">AirCare Supply Co</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Premium HVAC Solutions</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-2">
            <Link to="/" className="px-3 py-2 rounded-lg text-foreground hover:text-primary hover:bg-accent/10 transition-all duration-200">Home</Link>
            <Link to="/air-filters" className="px-3 py-2 rounded-lg text-foreground hover:text-primary hover:bg-accent/10 transition-all duration-200">Air Filters</Link>
            <Link to="/blog" className="px-3 py-2 rounded-lg text-foreground hover:text-primary hover:bg-accent/10 transition-all duration-200">Blog</Link>
            <Link to="/about" className="px-3 py-2 rounded-lg text-foreground hover:text-primary hover:bg-accent/10 transition-all duration-200">About</Link>
            <Link to="/faq" className="px-3 py-2 rounded-lg text-foreground hover:text-primary hover:bg-accent/10 transition-all duration-200">FAQ</Link>
            <Link to="/contact" className="px-3 py-2 rounded-lg text-foreground hover:text-primary hover:bg-accent/10 transition-all duration-200">Contact</Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Cart />
            
            {user ? <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>Account</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div> : <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/auth">Sign In</Link>
                </Button>
              </div>}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
