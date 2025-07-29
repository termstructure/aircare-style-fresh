import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Search, Filter, Star, Truck, Shield, Users } from "lucide-react";
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
      name: "3M Filtrete MERV 11 Premium Allergen Filter",
      size: "16x20x1",
      mervRating: 11,
      fprRating: 7,
      price: 24.99,
      brand: "3M Filtrete",
      category: "Premium Allergen",
      features: ["Captures 93% of particles", "Pet dander & pollen", "Dust mites", "Lint & household dust"],
      image: filtreteM11,
      subscription: true,
      popular: true
    },
    {
      id: "f11-20x25",
      name: "3M Filtrete MERV 11 Premium Allergen Filter",
      size: "20x25x1",
      mervRating: 11,
      fprRating: 7,
      price: 32.99,
      brand: "3M Filtrete",
      category: "Premium Allergen",
      features: ["Captures 93% of particles", "Pet dander & pollen", "Dust mites", "Lint & household dust"],
      image: filtreteM11,
      subscription: true,
      popular: false
    },
    {
      id: "f11-24x24",
      name: "3M Filtrete MERV 11 Premium Allergen Filter",
      size: "24x24x1",
      mervRating: 11,
      fprRating: 7,
      price: 36.99,
      brand: "3M Filtrete",
      category: "Premium Allergen",
      features: ["Captures 93% of particles", "Pet dander & pollen", "Dust mites", "Lint & household dust"],
      image: filtreteM11,
      subscription: true,
      popular: false
    },
    {
      id: "f11-16x25",
      name: "3M Filtrete MERV 11 Premium Allergen Filter",
      size: "16x25x1",
      mervRating: 11,
      fprRating: 7,
      price: 28.99,
      brand: "3M Filtrete",
      category: "Premium Allergen",
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
      features: ["99.97% particle capture", "Medical grade filtration", "Antimicrobial coating", "Superior air quality"],
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
      features: ["99.97% particle capture", "Medical grade filtration", "Antimicrobial coating", "Superior air quality"],
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
      features: ["Activated carbon layer", "Reduces household odors", "Pet & cooking smells", "Premium allergen protection"],
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
      features: ["Activated carbon layer", "Reduces household odors", "Pet & cooking smells", "Premium allergen protection"],
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
      category: "Premium Allergen",
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
      category: "Premium Allergen",
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
      category: "Premium Allergen",
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
      category: "Premium Allergen",
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
  const categories = ["Basic Protection", "Premium Allergen", "Ultra Allergen", "Hospital Grade", "Carbon Odor"];

  const FilterCard = ({ filter }: { filter: AirFilter }) => (
    <Link to={`/product/${filter.id}`}>
      <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <CardHeader className="pb-4">
          <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
            <img 
              src={filter.image} 
              alt={filter.name}
              className="w-full h-full object-contain p-4"
            />
          </div>
          <div className="flex items-start justify-between">
            <div>
              {filter.popular && (
                <Badge variant="secondary" className="mb-2">
                  <Star className="w-3 h-3 mr-1" />
                  Popular
                </Badge>
              )}
              <CardTitle className="text-lg leading-tight">{filter.name}</CardTitle>
              <p className="text-muted-foreground text-sm mt-1">{filter.brand}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
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
              <Badge className="mb-2">{filter.category}</Badge>
              <ul className="text-sm text-muted-foreground space-y-1">
                {filter.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Shield className="w-3 h-3 mr-2 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">${filter.price}</span>
                  {filter.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${filter.originalPrice}
                    </span>
                  )}
                </div>
                {filter.subscription && (
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <Truck className="w-3 h-3 mr-1" />
                    Subscribe & Save 10%
                  </p>
                )}
              </div>
              <Button 
                onClick={(e) => {
                  e.preventDefault();
                  // Add to cart functionality would go here
                }}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Premium Air Filters</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Breathe cleaner air with our selection of high-quality HVAC filters. 
            From basic protection to hospital-grade filtration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filter Products
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
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
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
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
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
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
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setFilters({
                    size: "",
                    mervRating: "",
                    fprRating: "",
                    brand: "",
                    category: "",
                    priceRange: "",
                    search: ""
                  })}
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Sort and Results */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} of {airFilters.length} results
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="merv-rating">MERV Rating</SelectItem>
                  <SelectItem value="brand">Brand A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((filter) => (
                  <FilterCard key={filter.id} filter={filter} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground text-lg">No filters match your criteria</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setFilters({
                      size: "",
                      mervRating: "",
                      fprRating: "",
                      brand: "",
                      category: "",
                      priceRange: "",
                      search: ""
                    })}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>

            {/* Load More - only show if there are results */}
            {filteredProducts.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Products
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-muted-foreground">All filters meet or exceed industry standards</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Truck className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Fast Shipping</h3>
              <p className="text-muted-foreground">Free shipping on orders over $50</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Expert Support</h3>
              <p className="text-muted-foreground">Get help choosing the right filter</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AirFilters;