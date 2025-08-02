import { Button } from "@/components/ui/button";
import { User, LogOut, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Cart from "@/components/Cart";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsDesktop } from "@/hooks/use-desktop";
import { useState } from "react";
import logo from "@/assets/logo.png";

const Header = () => {
  const { user, signOut } = useAuth();
  const isDesktop = useIsDesktop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleSignOut = async () => {
    await signOut();
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
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
          
          <nav className="hidden lg:flex items-center space-x-2">
            <Link to="/" className="px-3 py-2 rounded-lg text-foreground hover:text-primary hover:bg-accent/10 transition-all duration-200">Home</Link>
            <Link to="/air-filters" className="px-3 py-2 rounded-lg text-foreground hover:text-primary hover:bg-accent/10 transition-all duration-200">Air Filters</Link>
            <Link to="/blog" className="px-3 py-2 rounded-lg text-foreground hover:text-primary hover:bg-accent/10 transition-all duration-200">Blog</Link>
            <Link to="/about" className="px-3 py-2 rounded-lg text-foreground hover:text-primary hover:bg-accent/10 transition-all duration-200">About</Link>
            <Link to="/faq" className="px-3 py-2 rounded-lg text-foreground hover:text-primary hover:bg-accent/10 transition-all duration-200">FAQ</Link>
            <Link to="/contact" className="px-3 py-2 rounded-lg text-foreground hover:text-primary hover:bg-accent/10 transition-all duration-200">Contact</Link>
          </nav>

          <div className="flex items-center space-x-3">
            {/* Mobile menu button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <div className="flex flex-col space-y-4 mt-6">
                  <Link to="/" onClick={closeMobileMenu} className="px-4 py-3 text-lg text-foreground hover:text-primary hover:bg-accent/10 transition-all duration-200 rounded-lg">Home</Link>
                  <Link to="/air-filters" onClick={closeMobileMenu} className="px-4 py-3 text-lg text-foreground hover:text-primary hover:bg-accent/10 transition-all duration-200 rounded-lg">Air Filters</Link>
                  <Link to="/blog" onClick={closeMobileMenu} className="px-4 py-3 text-lg text-foreground hover:text-primary hover:bg-accent/10 transition-all duration-200 rounded-lg">Blog</Link>
                  <Link to="/about" onClick={closeMobileMenu} className="px-4 py-3 text-lg text-foreground hover:text-primary hover:bg-accent/10 transition-all duration-200 rounded-lg">About</Link>
                  <Link to="/faq" onClick={closeMobileMenu} className="px-4 py-3 text-lg text-foreground hover:text-primary hover:bg-accent/10 transition-all duration-200 rounded-lg">FAQ</Link>
                  <Link to="/contact" onClick={closeMobileMenu} className="px-4 py-3 text-lg text-foreground hover:text-primary hover:bg-accent/10 transition-all duration-200 rounded-lg">Contact</Link>
                  
                  <div className="border-t border-border pt-4 mt-6">
                    {user ? (
                      <Button variant="outline" onClick={handleSignOut} className="w-full justify-start">
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign out
                      </Button>
                    ) : (
                      <Button variant="outline" asChild className="w-full">
                        <Link to="/auth" onClick={closeMobileMenu}>Sign In</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Cart />
            
            {/* Desktop user menu */}
            <div className="hidden lg:flex">
              {user ? (
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
              ) : (
                <Button variant="outline" size="sm" asChild>
                  <Link to="/auth">Sign In</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
