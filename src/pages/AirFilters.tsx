import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Search, Filter, Star, Truck, Shield, Users, X, ChevronDown, SlidersHorizontal } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Import filter images
import filtreteM11 from "@/assets/filtrete-merv11.jpg";
import filtreteM13 from "@/assets/filtrete-merv13.jpg";
import filtreteM16 from "@/assets/filtrete-merv16.jpg";
import filtreteCarbon from "@/assets/filtrete-carbon.jpg";
import hdxM8 from "@/assets/hdx-merv8.jpg";
import hdxM13 from "@/assets/hdx-merv13.jpg";

interface AirFilter {
  id: string;
  name: string;
  size: string;
  mervRating: number;
  fprRating?: number;
  price: number;
  originalPrice?: number;
  brand: string;
  category: string;
  features: string[];
  image: string;
  subscription: boolean;
  popular: boolean;
}

const AirFilters = () => {
  const [searchParams] = useSearchParams();
  const isMobile = useIsMobile();
  
  const [filters, setFilters] = useState({
    size: "",
    mervRating: "",
    fprRating: "",
    brand: "",
    category: "",
    priceRange: "",
    search: ""
  });

  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  // Initialize filters from URL parameters
  useEffect(() => {
    const brandParam = searchParams.get("brand");
    const sizeParam = searchParams.get("size");
    const mervParam = searchParams.get("merv");
    const categoryParam = searchParams.get("category");
    
    if (brandParam || sizeParam || mervParam || categoryParam) {
      setFilters(prev => ({
        ...prev,
        brand: brandParam || "",
        size: sizeParam || "",
        mervRating: mervParam || "",
        category: categoryParam || ""
      }));
    }
  }, [searchParams]);

  // Comprehensive 3M Filtrete and HDX product lineup
  const airFilters: AirFilter[] = [
    // 3M Filtrete MERV 11 Series
    {
      id: "f11-16x20",
      name: "3M Filtrete MERV 11 Allergen Filter",
      size: "16x20x1",
      mervRating: 11,
      fprRating: 7,
      price: 24.99,
      brand: "3M Filtrete",
      category: "Allergen Protection",
      features: ["Captures 93% of particles", "Pet dander & pollen", "Dust mites", "Lint & household dust"],
      image: filtreteM11,
      subscription: true,
      popular: true
    },
    {
      id: "f11-20x25",
      name: "3M Filtrete MERV 11 Allergen Filter",
      size: "20x25x1",
      mervRating: 11,
      fprRating: 7,
      price: 32.99,
      brand: "3M Filtrete",
      category: "Allergen Protection",
      features: ["Captures 93% of particles", "Pet dander & pollen", "Dust mites", "Lint & household dust"],
      image: filtreteM11,
      subscription: true,
      popular: false
    },
    {
      id: "f11-24x24",
      name: "3M Filtrete MERV 11 Allergen Filter",
      size: "24x24x1",
      mervRating: 11,
      fprRating: 7,
      price: 36.99,
      brand: "3M Filtrete",
      category: "Allergen Protection",
      features: ["Captures 93% of particles", "Pet dander & pollen", "Dust mites", "Lint & household dust"],
      image: filtreteM11,
      subscription: true,
      popular: false
    },
    {
      id: "f11-16x25",
      name: "3M Filtrete MERV 11 Allergen Filter",
      size: "16x25x1",
      mervRating: 11,
      fprRating: 7,
      price: 28.99,
      brand: "3M Filtrete",
      category: "Allergen Protection",
      features: ["Captures 93% of particles", "Pet dander & pollen", "Dust mites", "Lint & household dust"],
      image: filtreteM11,
      subscription: true,
      popular: false
    },

    // 3M Filtrete MERV 13 Series
    {
      id: "f13-16x20",
      name: "3M Filtrete MERV 13 Ultra Allergen Filter",
      size: "16x20x1",
      mervRating: 13,
      fprRating: 10,
      price: 32.99,
      originalPrice: 36.99,
      brand: "3M Filtrete",
      category: "Ultra Allergen",
      features: ["Captures 97% of particles", "Bacteria & viruses", "Smoke particles", "Smog & cough/sneeze debris"],
      image: filtreteM13,
      subscription: true,
      popular: true
    },
    {
      id: "f13-20x25",
      name: "3M Filtrete MERV 13 Ultra Allergen Filter",
      size: "20x25x1",
      mervRating: 13,
      fprRating: 10,
      price: 42.99,
      originalPrice: 47.99,
      brand: "3M Filtrete",
      category: "Ultra Allergen",
      features: ["Captures 97% of particles", "Bacteria & viruses", "Smoke particles", "Smog & cough/sneeze debris"],
      image: filtreteM13,
      subscription: true,
      popular: false
    },
    {
      id: "f13-24x24",
      name: "3M Filtrete MERV 13 Ultra Allergen Filter",
      size: "24x24x1",
      mervRating: 13,
      fprRating: 10,
      price: 48.99,
      originalPrice: 52.99,
      brand: "3M Filtrete",
      category: "Ultra Allergen",
      features: ["Captures 97% of particles", "Bacteria & viruses", "Smoke particles", "Smog & cough/sneeze debris"],
      image: filtreteM13,
      subscription: true,
      popular: false
    },
    {
      id: "f13-16x25",
      name: "3M Filtrete MERV 13 Ultra Allergen Filter",
      size: "16x25x1",
      mervRating: 13,
      fprRating: 10,
      price: 38.99,
      originalPrice: 42.99,
      brand: "3M Filtrete",
      category: "Ultra Allergen",
      features: ["Captures 97% of particles", "Bacteria & viruses", "Smoke particles", "Smog & cough/sneeze debris"],
      image: filtreteM13,
      subscription: true,
      popular: false
    },

    // 3M Filtrete MERV 16 Hospital Grade
    {
      id: "f16-16x20",
      name: "3M Filtrete MERV 16 Hospital Grade Filter",
      size: "16x20x1",
      mervRating: 16,
      price: 52.99,
      brand: "3M Filtrete",
      category: "Hospital Grade",
      features: ["99.97% particle capture", "High efficiency filtration", "Antimicrobial coating", "Quality air cleaning"],
      image: filtreteM16,
      subscription: false,
      popular: false
    },
    {
      id: "f16-20x25",
      name: "3M Filtrete MERV 16 Hospital Grade Filter",
      size: "20x25x1",
      mervRating: 16,
      price: 68.99,
      brand: "3M Filtrete",
      category: "Hospital Grade",
      features: ["99.97% particle capture", "High efficiency filtration", "Antimicrobial coating", "Quality air cleaning"],
      image: filtreteM16,
      subscription: false,
      popular: false
    },

    // 3M Filtrete Carbon Odor Reduction
    {
      id: "fc-16x20",
      name: "3M Filtrete Carbon Odor Reduction Filter",
      size: "16x20x1",
      mervRating: 11,
      fprRating: 7,
      price: 34.99,
      brand: "3M Filtrete",
      category: "Carbon Odor",
      features: ["Activated carbon layer", "Reduces household odors", "Pet & cooking smells", "Allergen protection"],
      image: filtreteCarbon,
      subscription: true,
      popular: false
    },
    {
      id: "fc-20x25",
      name: "3M Filtrete Carbon Odor Reduction Filter",
      size: "20x25x1",
      mervRating: 11,
      fprRating: 7,
      price: 44.99,
      brand: "3M Filtrete",
      category: "Carbon Odor",
      features: ["Activated carbon layer", "Reduces household odors", "Pet & cooking smells", "Allergen protection"],
      image: filtreteCarbon,
      subscription: true,
      popular: false
    },

    // HDX Basic Protection Series (MERV 8)
    {
      id: "hdx8-16x20",
      name: "HDX Basic Protection Pleated Filter",
      size: "16x20x1",
      mervRating: 8,
      fprRating: 4,
      price: 12.99,
      brand: "HDX",
      category: "Basic Protection",
      features: ["Captures large particles", "Lint & dust", "Pet hair", "Budget-friendly option"],
      image: hdxM8,
      subscription: true,
      popular: true
    },
    {
      id: "hdx8-20x25",
      name: "HDX Basic Protection Pleated Filter",
      size: "20x25x1",
      mervRating: 8,
      fprRating: 4,
      price: 18.99,
      brand: "HDX",
      category: "Basic Protection",
      features: ["Captures large particles", "Lint & dust", "Pet hair", "Budget-friendly option"],
      image: hdxM8,
      subscription: true,
      popular: false
    },
    {
      id: "hdx8-24x24",
      name: "HDX Basic Protection Pleated Filter",
      size: "24x24x1",
      mervRating: 8,
      fprRating: 4,
      price: 22.99,
      brand: "HDX",
      category: "Basic Protection",
      features: ["Captures large particles", "Lint & dust", "Pet hair", "Budget-friendly option"],
      image: hdxM8,
      subscription: true,
      popular: false
    },
    {
      id: "hdx8-16x25",
      name: "HDX Basic Protection Pleated Filter",
      size: "16x25x1",
      mervRating: 8,
      fprRating: 4,
      price: 15.99,
      brand: "HDX",
      category: "Basic Protection",
      features: ["Captures large particles", "Lint & dust", "Pet hair", "Budget-friendly option"],
      image: hdxM8,
      subscription: true,
      popular: false
    },

    // HDX Premium Series (MERV 13)
    {
      id: "hdx13-16x20",
      name: "HDX Premium Pleated Filter FPR 10",
      size: "16x20x1",
      mervRating: 13,
      fprRating: 10,
      price: 24.99,
      brand: "HDX",
      category: "Allergen Protection",
      features: ["High efficiency filtration", "Allergen protection", "Smoke & fine particles", "Value pricing"],
      image: hdxM13,
      subscription: true,
      popular: false
    },
    {
      id: "hdx13-20x25",
      name: "HDX Premium Pleated Filter FPR 10",
      size: "20x25x1",
      mervRating: 13,
      fprRating: 10,
      price: 32.99,
      brand: "HDX",
      category: "Allergen Protection",
      features: ["High efficiency filtration", "Allergen protection", "Smoke & fine particles", "Value pricing"],
      image: hdxM13,
      subscription: true,
      popular: false
    },
    {
      id: "hdx13-24x24",
      name: "HDX Premium Pleated Filter FPR 10",
      size: "24x24x1",
      mervRating: 13,
      fprRating: 10,
      price: 38.99,
      brand: "HDX",
      category: "Allergen Protection",
      features: ["High efficiency filtration", "Allergen protection", "Smoke & fine particles", "Value pricing"],
      image: hdxM13,
      subscription: true,
      popular: false
    },
    {
      id: "hdx13-16x25",
      name: "HDX Premium Pleated Filter FPR 10",
      size: "16x25x1",
      mervRating: 13,
      fprRating: 10,
      price: 28.99,
      brand: "HDX",
      category: "Allergen Protection",
      features: ["High efficiency filtration", "Allergen protection", "Smoke & fine particles", "Value pricing"],
      image: hdxM13,
      subscription: true,
      popular: false
    }
  ];

  // Filter and sort products
  const getFilteredAndSortedProducts = () => {
    let filtered = airFilters.filter(filter => {
      // Search filter
      if (filters.search && !filter.name.toLowerCase().includes(filters.search.toLowerCase()) && 
          !filter.brand.toLowerCase().includes(filters.search.toLowerCase()) &&
          !filter.category.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Size filter
      if (filters.size && filter.size !== filters.size) {
        return false;
      }

      // MERV rating filter
      if (filters.mervRating && filter.mervRating.toString() !== filters.mervRating) {
        return false;
      }

      // FPR rating filter
      if (filters.fprRating && (!filter.fprRating || filter.fprRating.toString() !== filters.fprRating)) {
        return false;
      }

      // Brand filter
      if (filters.brand && filter.brand !== filters.brand) {
        return false;
      }

      // Category filter
      if (filters.category && filter.category !== filters.category) {
        return false;
      }

      return true;
    });

    // Sort products
    switch (sortBy) {
      case "popular":
        filtered.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
        break;
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "merv-rating":
        filtered.sort((a, b) => b.mervRating - a.mervRating);
        break;
      case "brand":
        filtered.sort((a, b) => a.brand.localeCompare(b.brand));
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredProducts = getFilteredAndSortedProducts();


  const sizes = ["16x20x1", "16x25x1", "20x25x1", "24x24x1", "20x20x1", "16x24x1"];
  const mervRatings = [8, 11, 13, 16];
  const fprRatings = [4, 7, 10];
  const brands = ["3M Filtrete", "HDX"];
  const categories = ["Basic Protection", "Allergen Protection", "Ultra Allergen", "Hospital Grade", "Carbon Odor"];

  const clearAllFilters = () => {
    setFilters({
      size: "",
      mervRating: "",
      fprRating: "",
      brand: "",
      category: "",
      priceRange: "",
      search: ""
    });
  };

  const getActiveFilterCount = () => {
    return Object.values(filters).filter(value => value !== "").length;
  };

  const FilterCard = ({ filter }: { filter: AirFilter }) => (
    <Link to={`/product/${filter.id}`}>
      <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <CardHeader className="pb-3 sm:pb-4 p-4 sm:p-6">
          <div className="aspect-square bg-muted rounded-lg mb-3 sm:mb-4 flex items-center justify-center">
            <img 
              src={filter.image} 
              alt={filter.name}
              className="w-full h-full object-contain p-3 sm:p-4"
            />
          </div>
          <div className="flex items-start justify-between">
            <div>
              {filter.popular && (
                <Badge variant="secondary" className="mb-2">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  Popular
                </Badge>
              )}
              <CardTitle className="text-base sm:text-lg leading-tight">{filter.name}</CardTitle>
              <p className="text-muted-foreground text-xs sm:text-sm mt-1">{filter.brand}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0 p-4 sm:p-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
              <Badge variant="outline" className="text-xs">
                Size: {filter.size}
              </Badge>
              <Badge variant="outline" className="text-xs">
                MERV {filter.mervRating}
              </Badge>
              {filter.fprRating && (
                <Badge variant="outline" className="text-xs">
                  FPR {filter.fprRating}
                </Badge>
              )}
            </div>
            
            <div>
              <Badge className="mb-2 text-xs sm:text-sm">{filter.category}</Badge>
              <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                {filter.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Shield className="w-3 h-3 mr-2 text-primary flex-shrink-0" />
                    <span className="text-xs sm:text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-2 gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-bold">${filter.price}</span>
                  {filter.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${filter.originalPrice}
                    </span>
                  )}
                </div>
                {filter.subscription && (
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <Truck className="w-3 h-3 mr-1 flex-shrink-0" />
                    Subscribe & Save 10%
                  </p>
                )}
              </div>
              <Button 
                onClick={(e) => {
                  e.preventDefault();
                  // Add to cart functionality would go here
                }}
                className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 min-h-touch"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="text-sm font-medium mb-2 block">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search filters..." 
            className="pl-10"
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
          />
        </div>
      </div>

      {/* Filter Size */}
      <div>
        <label className="text-sm font-medium mb-2 block">Filter Size</label>
        <Select value={filters.size} onValueChange={(value) => setFilters({...filters, size: value})}>
          <SelectTrigger className="bg-background border-input">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent className="bg-popover border border-border shadow-lg z-[60]">
            {sizes.map((size) => (
              <SelectItem key={size} value={size}>{size}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* MERV Rating */}
      <div>
        <label className="text-sm font-medium mb-2 block">MERV Rating</label>
        <div className="space-y-2">
          {mervRatings.map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox 
                id={`merv-${rating}`}
                checked={filters.mervRating.includes(rating.toString())}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFilters({...filters, mervRating: rating.toString()});
                  } else {
                    setFilters({...filters, mervRating: ""});
                  }
                }}
              />
              <label htmlFor={`merv-${rating}`} className="text-sm">MERV {rating}</label>
            </div>
          ))}
        </div>
      </div>

      {/* FPR Rating */}
      <div>
        <label className="text-sm font-medium mb-2 block">FPR Rating</label>
        <div className="space-y-2">
          {fprRatings.map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox 
                id={`fpr-${rating}`}
                checked={filters.fprRating.includes(rating.toString())}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFilters({...filters, fprRating: rating.toString()});
                  } else {
                    setFilters({...filters, fprRating: ""});
                  }
                }}
              />
              <label htmlFor={`fpr-${rating}`} className="text-sm">FPR {rating}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div>
        <label className="text-sm font-medium mb-2 block">Brand</label>
        <Select value={filters.brand} onValueChange={(value) => setFilters({...filters, brand: value})}>
          <SelectTrigger className="bg-background border-input">
            <SelectValue placeholder="Select brand" />
          </SelectTrigger>
          <SelectContent className="bg-popover border border-border shadow-lg z-[60]">
            {brands.map((brand) => (
              <SelectItem key={brand} value={brand}>{brand}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Category */}
      <div>
        <label className="text-sm font-medium mb-2 block">Filter Category</label>
        <Select value={filters.category} onValueChange={(value) => setFilters({...filters, category: value})}>
          <SelectTrigger className="bg-background border-input">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-popover border border-border shadow-lg z-[60]">
            {categories.map((category) => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button 
        variant="outline" 
        className="w-full"
        onClick={clearAllFilters}
      >
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto py-section-fluid-sm">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">Quality Air Filters</h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Breathe cleaner air with our selection of high-quality HVAC filters. 
            From basic protection to hospital-grade filtration.
          </p>
        </div>

        {/* Layout with Sidebar for Desktop and Drawer for Mobile */}
        {isMobile ? (
          /* Mobile Filter Drawer */
          <div>
            <div className="mb-6">
              <Drawer open={showFilters} onOpenChange={setShowFilters}>
                <DrawerTrigger asChild>
                  <Button variant="outline" className="w-full justify-between px-4 py-3 min-h-touch">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-sm sm:text-base">Filters</span>
                      {getActiveFilterCount() > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          {getActiveFilterCount()}
                        </Badge>
                      )}
                    </div>
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="max-h-[80vh]">
                  <DrawerHeader>
                    <DrawerTitle>Filter Products</DrawerTitle>
                  </DrawerHeader>
                  <div className="px-4 pb-6 overflow-y-auto">
                    <FiltersContent />
                  </div>
                </DrawerContent>
              </Drawer>
              
              {/* Active Filters Chips */}
              {getActiveFilterCount() > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {filters.search && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Search: {filters.search}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => setFilters({...filters, search: ""})}
                      />
                    </Badge>
                  )}
                  {filters.size && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Size: {filters.size}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => setFilters({...filters, size: ""})}
                      />
                    </Badge>
                  )}
                  {filters.mervRating && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      MERV {filters.mervRating}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => setFilters({...filters, mervRating: ""})}
                      />
                    </Badge>
                  )}
                  {filters.brand && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {filters.brand}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => setFilters({...filters, brand: ""})}
                      />
                    </Badge>
                  )}
                  {filters.category && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {filters.category}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => setFilters({...filters, category: ""})}
                      />
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* Sort and Results */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} of {airFilters.length} results
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-background border-input">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-popover border border-border shadow-lg z-[60]">
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="merv-rating">MERV Rating</SelectItem>
                  <SelectItem value="brand">Brand A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((filter) => (
                  <FilterCard key={filter.id} filter={filter} />
                ))
              ) : (
                 <div className="col-span-full text-center py-fluid-lg">
                  <p className="text-muted-foreground text-lg">No filters match your criteria</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={clearAllFilters}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Desktop Layout with Always-Open Sidebar */
          <div className="flex gap-6">
            {/* Sidebar - Always Open */}
            <div className="w-80 flex-shrink-0">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5" />
                    Filters
                    {getActiveFilterCount() > 0 && (
                      <Badge variant="secondary" className="text-xs ml-auto">
                        {getActiveFilterCount()}
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0 max-h-[80vh] overflow-y-auto">
                  <FiltersContent />
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Sort and Results */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-muted-foreground">
                  Showing {filteredProducts.length} of {airFilters.length} results
                </p>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 bg-background border-input">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border border-border shadow-lg z-[60]">
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="merv-rating">MERV Rating</SelectItem>
                    <SelectItem value="brand">Brand A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((filter) => (
                    <FilterCard key={filter.id} filter={filter} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-fluid-lg">
                    <p className="text-muted-foreground text-lg">No filters match your criteria</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={clearAllFilters}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Load More - only show if there are results */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Products
            </Button>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <Card>
            <CardContent className="p-4 sm:p-6 md:p-8 text-center">
              <Shield className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-primary mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">Quality Focused</h3>
              <p className="text-muted-foreground text-sm sm:text-base">All filters meet or exceed industry standards</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6 md:p-8 text-center">
              <Truck className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-primary mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">Fast Shipping</h3>
              <p className="text-muted-foreground text-sm sm:text-base">Free shipping on orders over $50</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6 md:p-8 text-center">
              <Users className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-primary mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-muted-foreground text-sm sm:text-base">Get help choosing the right filter</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AirFilters;