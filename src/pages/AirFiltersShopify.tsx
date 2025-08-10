import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Loader2, Filter, SortAsc, Star, Truck, Shield, HeadphonesIcon, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { useIsDesktop } from "@/hooks/use-desktop";
import { useIsMobile } from "@/hooks/use-mobile";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useProductsByCollection } from "@/hooks/useShopify";
import { useProductsByCollectionWithFallback } from "@/hooks/useShopifyWithFallback";
import { useCart } from "@/contexts/CartContext";
import { ShopifyProduct } from "@/lib/shopify";
import { formatPrice, getProductImageUrl } from "@/lib/shopify";
import ShopifyTest from "@/components/ShopifyTest";
interface Filters {
  size: string[];
  mervRating: string[];
  brand: string[];
  priceRange: string;
  availability: string;
}
const AirFiltersShopify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("popularity");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCartDialog, setShowCartDialog] = useState(false);
  const [addedProduct, setAddedProduct] = useState<ShopifyProduct | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const isDesktop = useIsDesktop();
  const isMobile = useIsMobile();
  
  // Pagination settings
  const itemsPerPage = isDesktop ? 12 : 8;
  const [filters, setFilters] = useState<Filters>({
    size: [],
    mervRating: [],
    brand: [],
    priceRange: "all",
    availability: "all"
  });
  const {
    toast
  } = useToast();
  const {
    addToCart,
    getCheckoutUrl
  } = useCart();

  // Fetch products from Shopify air-filters collection with fallback
  const {
    data: productsWithFallback,
    isLoading: isLoadingFallback,
    error: errorFallback
  } = useProductsByCollectionWithFallback("air-filters");
  const {
    data: productsOriginal,
    isLoading: isLoadingOriginal,
    error: errorOriginal
  } = useProductsByCollection("air-filters");

  // Use fallback data if available, otherwise try original
  const products = productsWithFallback || productsOriginal;
  const isLoading = isLoadingFallback && isLoadingOriginal;
  const error = errorFallback && errorOriginal ? errorFallback : null;

  // Initialize filters from URL params
  useEffect(() => {
    const size = searchParams.get("size");
    const merv = searchParams.get("merv");
    const brand = searchParams.get("brand");
    if (size || merv || brand) {
      setFilters(prev => ({
        ...prev,
        size: size ? [size] : [],
        mervRating: merv ? [merv] : [],
        brand: brand ? [brand] : []
      }));
    }
  }, [searchParams]);

  // Helper function to extract MERV rating from tags or title
  const getMervRating = (product: ShopifyProduct): number => {
    // Check if product.tags exists and is an array before calling find
    if (product.tags && Array.isArray(product.tags)) {
      const mervTag = product.tags.find(tag => tag.toLowerCase().startsWith('merv-'));
      if (mervTag) {
        const rating = parseInt(mervTag.replace('merv-', ''));
        return isNaN(rating) ? 0 : rating;
      }
    }

    // Try to extract from title
    const mervMatch = product.title.match(/merv\s*(\d+)/i);
    return mervMatch ? parseInt(mervMatch[1]) : 0;
  };

  // Helper function to extract size from tags or title
  const getSize = (product: ShopifyProduct): string => {
    // Check if product.tags exists and is an array before calling find
    if (product.tags && Array.isArray(product.tags)) {
      const sizeTag = product.tags.find(tag => /\d+x\d+x\d+/.test(tag));
      if (sizeTag) return sizeTag;
    }
    const sizeMatch = product.title.match(/(\d+x\d+x\d+)/);
    return sizeMatch ? sizeMatch[1] : "";
  };

  // Filter and sort products
  const getFilteredAndSortedProducts = () => {
    if (!products) return [];
    let filtered = products.filter(product => {
      // Search term filter
      if (searchTerm && !product.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Size filter
      if (filters.size.length > 0) {
        const productSize = getSize(product);
        if (!filters.size.some(size => productSize.includes(size))) {
          return false;
        }
      }

      // MERV rating filter
      if (filters.mervRating.length > 0) {
        const productMerv = getMervRating(product);
        if (!filters.mervRating.some(merv => productMerv === parseInt(merv))) {
          return false;
        }
      }

      // Brand filter
      if (filters.brand.length > 0) {
        if (!filters.brand.includes(product.vendor)) {
          return false;
        }
      }

      // Price range filter
      if (filters.priceRange !== "all") {
        const price = parseFloat(product.variants[0]?.price || "0");
        const [min, max] = filters.priceRange.split("-").map(Number);
        if (max && (price < min || price > max)) {
          return false;
        }
        if (!max && price < min) {
          return false;
        }
      }

      // Availability filter
      if (filters.availability === "in-stock") {
        if (!product.variants.some(variant => variant.available)) {
          return false;
        }
      }
      return true;
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => parseFloat(a.variants[0]?.price || "0") - parseFloat(b.variants[0]?.price || "0"));
        break;
      case "price-high":
        filtered.sort((a, b) => parseFloat(b.variants[0]?.price || "0") - parseFloat(a.variants[0]?.price || "0"));
        break;
      case "merv-rating":
        filtered.sort((a, b) => getMervRating(b) - getMervRating(a));
        break;
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // popularity
        // Keep original order (can implement popularity logic later)
        break;
    }
    return filtered;
  };
  const filteredProducts = getFilteredAndSortedProducts();
  
  // Pagination calculations
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);
  
  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchTerm, sortBy]);

  // Get unique values for filter options
  const getUniqueValues = () => {
    if (!products) return {
      sizes: [],
      mervRatings: [],
      brands: []
    };
    const sizes = [...new Set(products.map(getSize).filter(Boolean))];
    const mervRatings = [...new Set(products.map(getMervRating).filter(Boolean))].sort((a, b) => a - b);
    const brands = [...new Set(products.map(p => p.vendor).filter(Boolean))];
    return {
      sizes,
      mervRatings,
      brands
    };
  };
  const {
    sizes,
    mervRatings,
    brands
  } = getUniqueValues();
  const handleAddToCart = async (product: ShopifyProduct) => {
    const availableVariant = product.variants.find(variant => variant.available);
    if (!availableVariant) {
      toast({
        title: "Out of Stock",
        description: "This product is currently unavailable.",
        variant: "destructive"
      });
      return;
    }
    addToCart(product, availableVariant.id, 1);
    setAddedProduct(product);
    setShowCartDialog(true);
  };
  const handleGoToCheckout = async () => {
    const checkoutUrl = await getCheckoutUrl();
    if (checkoutUrl) {
      window.location.assign(checkoutUrl);
    }
    setShowCartDialog(false);
  };
  const handleContinueShopping = () => {
    setShowCartDialog(false);
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      } else {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };
  if (isLoading) {
    return <div className="min-h-screen">
        <Header />
        <div className="container mx-auto py-fluid-md">
          <ShopifyTest />
        </div>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading air filters...</p>
          </div>
        </div>
        <Footer />
      </div>;
  }
  if (error) {
    return <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-destructive mb-4">Failed to load products</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
        <Footer />
      </div>;
  }
  return <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-section-fluid-lg bg-gradient-subtle">
        <div className="container mx-auto text-center relative">
          {/* Decorative accent lines */}
          <div className="flex items-center justify-center mb-fluid-sm">
            <div className="h-px bg-accent/30 flex-1 max-w-16 sm:max-w-24"></div>
            <span className="px-3 sm:px-4 text-xs sm:text-sm font-medium text-accent uppercase tracking-wider">
              Air Filters
            </span>
            <div className="h-px bg-accent/30 flex-1 max-w-16 sm:max-w-24"></div>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-fluid-sm">
            <span className="text-foreground">Quality Air </span>
            <span className="text-transparent bg-clip-text bg-gradient-primary">Filters</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-fluid-md max-w-2xl mx-auto leading-relaxed">
            Quality air filtration solutions to help maintain better indoor air quality
          </p>
        </div>
      </section>

      <div className="container mx-auto py-section-fluid-md">
        {!isDesktop ? (/* Mobile/Tablet Layout - Collapsible Filters + Products */
      <div className="flex flex-col gap-fluid-sm">
            <Card className="p-0">
              <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="flex items-center justify-between w-full p-6">
                    <div className="flex items-center gap-2">
                      <Filter className="w-5 h-5" />
                      <h3 className="text-lg font-semibold">Filters</h3>
                    </div>
                    {filtersOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </Button>
                </CollapsibleTrigger>

                <CollapsibleContent className="px-6 pb-6">
                  {/* Search */}
                  <div className="mb-fluid-sm">
                    <label className="text-sm font-medium mb-2 block">Search</label>
                    <Input placeholder="Search filters..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                  </div>

                  {/* Size Filter */}
                  {sizes.length > 0 && <div className="mb-fluid-sm">
                      <label className="text-sm font-medium mb-3 block">Size</label>
                      <Select value={filters.size[0] || "all"} onValueChange={value => {
                  if (value === "all") {
                    setFilters(prev => ({
                      ...prev,
                      size: []
                    }));
                  } else {
                    setFilters(prev => ({
                      ...prev,
                      size: [value]
                    }));
                  }
                }}>
                        <SelectTrigger className="w-full bg-background border-border">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border-border z-[60]">
                          <SelectItem value="all">All Sizes</SelectItem>
                          {sizes.map(size => <SelectItem key={size} value={size}>{size}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>}

                  {/* MERV Rating Filter */}
                  {mervRatings.length > 0 && <div className="mb-fluid-sm">
                      <label className="text-sm font-medium mb-3 block">MERV Rating</label>
                      <Select value={filters.mervRating[0] || "all"} onValueChange={value => {
                  if (value === "all") {
                    setFilters(prev => ({
                      ...prev,
                      mervRating: []
                    }));
                  } else {
                    setFilters(prev => ({
                      ...prev,
                      mervRating: [value]
                    }));
                  }
                }}>
                        <SelectTrigger className="w-full bg-background border-border">
                          <SelectValue placeholder="Select MERV rating" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border-border z-[60]">
                          <SelectItem value="all">All MERV Ratings</SelectItem>
                          {mervRatings.map(rating => <SelectItem key={rating} value={rating.toString()}>MERV {rating}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>}

                  {/* Brand Filter */}
                  {brands.length > 0 && <div className="mb-fluid-sm">
                      <label className="text-sm font-medium mb-3 block">Brand</label>
                      <Select value={filters.brand[0] || "all"} onValueChange={value => {
                  if (value === "all") {
                    setFilters(prev => ({
                      ...prev,
                      brand: []
                    }));
                  } else {
                    setFilters(prev => ({
                      ...prev,
                      brand: [value]
                    }));
                  }
                }}>
                        <SelectTrigger className="w-full bg-background border-border">
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border-border z-[60]">
                          <SelectItem value="all">All Brands</SelectItem>
                          {brands.map(brand => <SelectItem key={brand} value={brand}>{brand}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>}

                  {/* Price Range Filter */}
                  <div className="mb-fluid-sm">
                    <label className="text-sm font-medium mb-3 block">Price Range</label>
                    <Select value={filters.priceRange} onValueChange={value => {
                  setFilters(prev => ({
                    ...prev,
                    priceRange: value
                  }));
                }}>
                      <SelectTrigger className="w-full bg-background border-border">
                        <SelectValue placeholder="Select price range" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border z-[60]">
                        <SelectItem value="all">All Prices</SelectItem>
                        <SelectItem value="0-25">Under $25</SelectItem>
                        <SelectItem value="25-50">$25 - $50</SelectItem>
                        <SelectItem value="50-100">$50 - $100</SelectItem>
                        <SelectItem value="100">$100+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Availability Filter */}
                  <div className="mb-fluid-sm">
                    <label className="text-sm font-medium mb-3 block">Availability</label>
                    <Select value={filters.availability} onValueChange={value => {
                  setFilters(prev => ({
                    ...prev,
                    availability: value
                  }));
                }}>
                      <SelectTrigger className="w-full bg-background border-border">
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border z-[60]">
                        <SelectItem value="all">All Products</SelectItem>
                        <SelectItem value="in-stock">In Stock Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Clear Filters */}
                  <Button variant="outline" onClick={() => {
                setFilters({
                  size: [],
                  mervRating: [],
                  brand: [],
                  priceRange: "all",
                  availability: "all"
                });
                setSearchTerm("");
              }} className="w-full">
                    Clear All Filters
                  </Button>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            {/* Mobile Products Grid */}
            <div>
              {/* Sort and Results Count */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <p className="text-muted-foreground">
                  Showing {startIndex + 1}-{Math.min(endIndex, totalProducts)} of {totalProducts} products
                </p>
                
                <div className="flex items-center gap-2">
                  <SortAsc className="w-4 h-4" />
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popularity">Most Popular</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="merv-rating">MERV Rating</SelectItem>
                      <SelectItem value="name">Name A-Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Products */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentProducts.map(product => {
              const mervRating = getMervRating(product);
              const size = getSize(product);
              const mainVariant = product.variants[0];
              const isAvailable = product.variants.some(variant => variant.available);
              return <Card key={product.id} className="group hover:shadow-elegant transition-all duration-300">
                      <CardContent className="p-0">
                        <Link to={`/product/${product.handle}`} className="block">
                          <div className="relative overflow-hidden rounded-t-lg">
                            <AspectRatio ratio={1}>
                              <img 
                                src={getProductImageUrl(product)} 
                                alt={product.title} 
                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  e.currentTarget.src = '/placeholder.svg';
                                }}
                              />
                            </AspectRatio>
                            {!isAvailable && <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <Badge variant="destructive">Out of Stock</Badge>
                              </div>}
                            <div className="absolute top-2 right-2">
                              {mervRating > 0 && <Badge variant="secondary">MERV {mervRating}</Badge>}
                            </div>
                          </div>

                          <div className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold text-foreground line-clamp-2 flex-1">
                                {product.title}
                              </h3>
                            </div>

                            <p className="text-sm text-muted-foreground mb-2">{product.vendor}</p>
                            
                            {size && <p className="text-sm text-muted-foreground mb-3">Size: {size}</p>}

                            <div className="flex items-center justify-between">
                              <div className="text-lg font-bold text-foreground">
                                {formatPrice(mainVariant?.price || "0")}
                              </div>
                            </div>
                          </div>
                        </Link>
                        
                        <div className="px-4 pb-4">
                          <Button onClick={e => {
                      e.preventDefault();
                      handleAddToCart(product);
                    }} disabled={!isAvailable} size="sm" className="w-full">
                            Add to Cart
                          </Button>
                        </div>
                      </CardContent>
                    </Card>;
            })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      {currentPage > 1 && (
                        <PaginationItem>
                          <PaginationPrevious 
                            href="#" 
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(currentPage - 1);
                            }}
                          />
                        </PaginationItem>
                      )}
                      
                      {generatePageNumbers().map((page, index, array) => (
                        <div key={page}>
                          {index > 0 && page > array[index - 1] + 1 && (
                            <PaginationItem>
                              <PaginationEllipsis />
                            </PaginationItem>
                          )}
                          <PaginationItem>
                            <PaginationLink
                              href="#"
                              isActive={currentPage === page}
                              onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(page);
                              }}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        </div>
                      ))}
                      
                      {currentPage < totalPages && (
                        <PaginationItem>
                          <PaginationNext 
                            href="#" 
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(currentPage + 1);
                            }}
                          />
                        </PaginationItem>
                      )}
                    </PaginationContent>
                  </Pagination>
                </div>
              )}

              {filteredProducts.length === 0 && <div className="text-center py-fluid-lg">
                  <p className="text-muted-foreground mb-4">No products match your filters</p>
                  <Button variant="outline" onClick={() => {
              setFilters({
                size: [],
                mervRating: [],
                brand: [],
                priceRange: "all",
                availability: "all"
              });
              setSearchTerm("");
            }}>
                    Clear Filters
                  </Button>
                </div>}
            </div>
          </div>) : (/* Desktop Layout - Fixed Sidebar + Product Grid */
      <div className="flex gap-8">
            {/* Always-open Desktop Sidebar */}
            <div className="w-80 flex-shrink-0">
              <Card className="p-6 sticky top-4">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="w-5 h-5" />
                  <h3 className="text-lg font-semibold">Filters</h3>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <Input placeholder="Search filters..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                </div>

                {/* Size Filter */}
                {sizes.length > 0 && <div className="mb-6">
                    <label className="text-sm font-medium mb-3 block">Size</label>
                    <Select value={filters.size[0] || "all"} onValueChange={value => {
                if (value === "all") {
                  setFilters(prev => ({
                    ...prev,
                    size: []
                  }));
                } else {
                  setFilters(prev => ({
                    ...prev,
                    size: [value]
                  }));
                }
              }}>
                      <SelectTrigger className="w-full bg-background border-border">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border z-[60]">
                        <SelectItem value="all">All Sizes</SelectItem>
                        {sizes.map(size => <SelectItem key={size} value={size}>{size}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>}

                {/* MERV Rating Filter */}
                {mervRatings.length > 0 && <div className="mb-6">
                    <label className="text-sm font-medium mb-3 block">MERV Rating</label>
                    <Select value={filters.mervRating[0] || "all"} onValueChange={value => {
                if (value === "all") {
                  setFilters(prev => ({
                    ...prev,
                    mervRating: []
                  }));
                } else {
                  setFilters(prev => ({
                    ...prev,
                    mervRating: [value]
                  }));
                }
              }}>
                      <SelectTrigger className="w-full bg-background border-border">
                        <SelectValue placeholder="Select MERV rating" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border z-[60]">
                        <SelectItem value="all">All MERV Ratings</SelectItem>
                        {mervRatings.map(rating => <SelectItem key={rating} value={rating.toString()}>MERV {rating}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>}

                {/* Brand Filter */}
                {brands.length > 0 && <div className="mb-6">
                    <label className="text-sm font-medium mb-3 block">Brand</label>
                    <Select value={filters.brand[0] || "all"} onValueChange={value => {
                if (value === "all") {
                  setFilters(prev => ({
                    ...prev,
                    brand: []
                  }));
                } else {
                  setFilters(prev => ({
                    ...prev,
                    brand: [value]
                  }));
                }
              }}>
                      <SelectTrigger className="w-full bg-background border-border">
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border z-[60]">
                        <SelectItem value="all">All Brands</SelectItem>
                        {brands.map(brand => <SelectItem key={brand} value={brand}>{brand}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>}

                {/* Price Range Filter */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-3 block">Price Range</label>
                  <Select value={filters.priceRange} onValueChange={value => {
                setFilters(prev => ({
                  ...prev,
                  priceRange: value
                }));
              }}>
                    <SelectTrigger className="w-full bg-background border-border">
                      <SelectValue placeholder="Select price range" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border z-[60]">
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="0-25">Under $25</SelectItem>
                      <SelectItem value="25-50">$25 - $50</SelectItem>
                      <SelectItem value="50-100">$50 - $100</SelectItem>
                      <SelectItem value="100">$100+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Availability Filter */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-3 block">Availability</label>
                  <Select value={filters.availability} onValueChange={value => {
                setFilters(prev => ({
                  ...prev,
                  availability: value
                }));
              }}>
                    <SelectTrigger className="w-full bg-background border-border">
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border z-[60]">
                      <SelectItem value="all">All Products</SelectItem>
                      <SelectItem value="in-stock">In Stock Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Clear Filters */}
                <Button variant="outline" onClick={() => {
              setFilters({
                size: [],
                mervRating: [],
                brand: [],
                priceRange: "all",
                availability: "all"
              });
              setSearchTerm("");
            }} className="w-full">
                  Clear All Filters
                </Button>
              </Card>
            </div>

            {/* Desktop Products Grid */}
            <div className="flex-1">
              {/* Sort and Results Count */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <p className="text-muted-foreground">
                  Showing {startIndex + 1}-{Math.min(endIndex, totalProducts)} of {totalProducts} products
                </p>
                
                <div className="flex items-center gap-2">
                  <SortAsc className="w-4 h-4" />
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popularity">Most Popular</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="merv-rating">MERV Rating</SelectItem>
                      <SelectItem value="name">Name A-Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Products */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentProducts.map(product => {
              const mervRating = getMervRating(product);
              const size = getSize(product);
              const mainVariant = product.variants[0];
              const isAvailable = product.variants.some(variant => variant.available);
              return <Card key={product.id} className="group hover:shadow-elegant transition-all duration-300">
                      <CardContent className="p-0">
                        <Link to={`/product/${product.handle}`} className="block">
                          <div className="relative overflow-hidden rounded-t-lg">
                            <AspectRatio ratio={1}>
                              <img 
                                src={getProductImageUrl(product)} 
                                alt={product.title} 
                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  e.currentTarget.src = '/placeholder.svg';
                                }}
                              />
                            </AspectRatio>
                            {!isAvailable && <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <Badge variant="destructive">Out of Stock</Badge>
                              </div>}
                            <div className="absolute top-2 right-2">
                              {mervRating > 0 && <Badge variant="secondary">MERV {mervRating}</Badge>}
                            </div>
                          </div>

                          <div className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold text-foreground line-clamp-2 flex-1">
                                {product.title}
                              </h3>
                            </div>

                            <p className="text-sm text-muted-foreground mb-2">{product.vendor}</p>
                            
                            {size && <p className="text-sm text-muted-foreground mb-3">Size: {size}</p>}

                            <div className="flex items-center justify-between">
                              <div className="text-lg font-bold text-foreground">
                                {formatPrice(mainVariant?.price || "0")}
                              </div>
                            </div>
                          </div>
                        </Link>
                        
                        <div className="px-4 pb-4">
                          <Button onClick={e => {
                      e.preventDefault();
                      handleAddToCart(product);
                    }} disabled={!isAvailable} size="sm" className="w-full">
                            Add to Cart
                          </Button>
                        </div>
                      </CardContent>
                    </Card>;
            })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      {currentPage > 1 && (
                        <PaginationItem>
                          <PaginationPrevious 
                            href="#" 
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(currentPage - 1);
                            }}
                          />
                        </PaginationItem>
                      )}
                      
                      {generatePageNumbers().map((page, index, array) => (
                        <div key={page}>
                          {index > 0 && page > array[index - 1] + 1 && (
                            <PaginationItem>
                              <PaginationEllipsis />
                            </PaginationItem>
                          )}
                          <PaginationItem>
                            <PaginationLink
                              href="#"
                              isActive={currentPage === page}
                              onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(page);
                              }}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        </div>
                      ))}
                      
                      {currentPage < totalPages && (
                        <PaginationItem>
                          <PaginationNext 
                            href="#" 
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(currentPage + 1);
                            }}
                          />
                        </PaginationItem>
                      )}
                    </PaginationContent>
                  </Pagination>
                </div>
              )}

              {filteredProducts.length === 0 && <div className="text-center py-fluid-lg">
                  <p className="text-muted-foreground mb-4">No products match your filters</p>
                  <Button variant="outline" onClick={() => {
              setFilters({
                size: [],
                mervRating: [],
                brand: [],
                priceRange: "all",
                availability: "all"
              });
              setSearchTerm("");
            }}>
                    Clear Filters
                  </Button>
                </div>}
            </div>
          </div>)}

        {/* Trust Indicators */}
        
      </div>

      {/* Add to Cart Confirmation Dialog */}
      <AlertDialog open={showCartDialog} onOpenChange={setShowCartDialog}>
        <AlertDialogContent className={isMobile ? "w-[95%] max-w-md" : ""}>
          <AlertDialogHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <AlertDialogTitle className="text-xl">Added to Cart!</AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              1 × {addedProduct?.title} added to your cart
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className={isMobile ? "flex-col space-y-2 space-x-0" : "flex-row space-x-2"}>
            <AlertDialogCancel onClick={handleContinueShopping} className={isMobile ? "w-full h-12" : ""}>
              Continue Shopping
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleGoToCheckout} className={isMobile ? "w-full h-12" : ""}>
              Go to Checkout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>;
};
export default AirFiltersShopify;