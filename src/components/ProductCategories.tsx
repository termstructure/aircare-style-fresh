import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Loader2, Shield, ShieldCheck } from "lucide-react";
import ShieldPlus from "./ShieldPlus";
import { Link } from "react-router-dom";
import { useCollections } from "@/hooks/useShopify";
import filtersImg from "@/assets/filters.jpg";
import hvacSystemsImg from "@/assets/hvac-systems.jpg";
import accessoriesImg from "@/assets/accessories.jpg";

// Fallback categories for when Shopify is loading or unavailable
const fallbackCategories = [
  {
    id: "hvac-systems", 
    title: "HVAC Systems",
    description: "Complete heating, ventilation, and air conditioning systems for residential and commercial use.",
    image: hvacSystemsImg,
    handle: "hvac-systems",
    features: ["Energy Efficient", "Quality Products", "Reliable Service"]
  },
  {
    id: "accessories",
    title: "Parts & Accessories", 
    description: "Quality replacement parts, tools, and accessories to keep your HVAC systems running smoothly.",
    image: accessoriesImg,
    handle: "accessories",
    features: ["Quality Parts", "Fast Shipping", "Helpful Support"]
  }
];

const ProductCategories = () => {
  const { data: shopifyCollections, isLoading, error } = useCollections();
  
  // Function to get MERV priority for sorting
  const getMervPriority = (title: string) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('merv 8') || titleLower.includes('merv-8') || titleLower.includes('merv8')) return 1;
    if (titleLower.includes('merv 11') || titleLower.includes('merv-11') || titleLower.includes('merv11')) return 2;
    if (titleLower.includes('merv 13') || titleLower.includes('merv-13') || titleLower.includes('merv13')) return 3;
    return 999; // Collections without MERV ratings go last
  };

  // Function to check if category is a MERV collection
  const isMervCollection = (title: string) => {
    const titleLower = title.toLowerCase();
    return titleLower.includes('merv 8') || titleLower.includes('merv-8') || titleLower.includes('merv8') ||
           titleLower.includes('merv 11') || titleLower.includes('merv-11') || titleLower.includes('merv11') ||
           titleLower.includes('merv 13') || titleLower.includes('merv-13') || titleLower.includes('merv13');
  };

  // Function to get MERV icon and styling
  const getMervIconData = (title: string) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('merv 8') || titleLower.includes('merv-8') || titleLower.includes('merv8')) {
      return {
        icon: Shield,
        tier: 'Good',
        bgGradient: 'bg-gradient-to-br from-muted/20 to-muted/10',
        iconColor: 'text-primary',
        badgeText: 'Basic Protection'
      };
    }
    if (titleLower.includes('merv 11') || titleLower.includes('merv-11') || titleLower.includes('merv11')) {
      return {
        icon: ShieldCheck,
        tier: 'Better',
        bgGradient: 'bg-gradient-to-br from-muted/20 to-muted/10',
        iconColor: 'text-primary',
        badgeText: 'Enhanced Protection'
      };
    }
    if (titleLower.includes('merv 13') || titleLower.includes('merv-13') || titleLower.includes('merv13')) {
      return {
        icon: ShieldPlus,
        tier: 'Best',
        bgGradient: 'bg-gradient-to-br from-muted/20 to-muted/10',
        iconColor: 'text-primary',
        badgeText: 'Premium Protection'
      };
    }
    return null;
  };

  // Use Shopify collections if available, otherwise fallback to static data
  // Filter out air-filters collection and sort by MERV priority
  const categories = shopifyCollections?.length ? shopifyCollections
    .filter(collection => collection.handle !== "air-filters")
    .map(collection => ({
      id: collection.id,
      title: collection.title,
      description: collection.description || fallbackCategories.find(cat => cat.handle === collection.handle)?.description || "Quality products for your needs.",
      image: collection.image?.src || fallbackCategories.find(cat => cat.handle === collection.handle)?.image || filtersImg,
      handle: collection.handle,
      features: fallbackCategories.find(cat => cat.handle === collection.handle)?.features || ["Quality Products", "Fast Shipping", "Helpful Support"]
    }))
    .sort((a, b) => getMervPriority(a.title) - getMervPriority(b.title)) : fallbackCategories;

  if (isLoading) {
    return (
      <section id="products" className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-section-fluid-lg bg-gradient-subtle">
      <div className="container mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-1 sm:w-12 sm:h-1 bg-primary rounded-full" />
            <span className="text-primary font-medium text-sm sm:text-base">Our Products</span>
            <div className="w-8 h-1 sm:w-12 sm:h-1 bg-primary rounded-full" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Quality Air Solutions
          </h2>
          <p className="text-xl font-body text-muted-foreground max-w-3xl mx-auto">
            Quality air filtration products and HVAC solutions to help you maintain 
            better indoor air quality and system efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          {categories.map((category, index) => {
            const mervData = getMervIconData(category.title);
            const isMerv = isMervCollection(category.title);
            
            return (
              <Card key={category.id || index} className="group hover:shadow-elegant transition-all duration-300 border-0 bg-card">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    {isMerv && mervData ? (
                      // MERV collections use icons
                      <div className={`w-full h-48 flex flex-col items-center justify-center ${mervData.bgGradient} group-hover:scale-105 transition-transform duration-300`}>
                        <mervData.icon className={`w-16 h-16 sm:w-20 sm:h-20 ${mervData.iconColor} mb-2 group-hover:scale-110 transition-transform duration-300`} />
                        <div className="text-center">
                          <div className={`text-xs font-semibold ${mervData.iconColor}`}>{mervData.tier}</div>
                        </div>
                      </div>
                    ) : (
                      // Non-MERV collections use images
                      <img 
                        src={category.image} 
                        alt={category.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                
                 <div className="p-4 sm:p-6 md:p-8">
                   <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-3">{category.title}</h3>
                   <p className="text-muted-foreground mb-4 line-clamp-3 text-sm sm:text-base">{category.description}</p>
                   
                   <div className="flex flex-wrap gap-2 mb-6">
                    {category.features.map((feature, featureIndex) => (
                      <span 
                        key={featureIndex}
                        className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  {/* Create dynamic links based on category with MERV filtering */}
                  <Link to={(() => {
                    const titleLower = category.title.toLowerCase();
                    if (titleLower.includes('merv 8') || titleLower.includes('merv-8') || titleLower.includes('merv8')) {
                      return "/air-filters?merv=8";
                    }
                    if (titleLower.includes('merv 11') || titleLower.includes('merv-11') || titleLower.includes('merv11')) {
                      return "/air-filters?merv=11";
                    }
                    if (titleLower.includes('merv 13') || titleLower.includes('merv-13') || titleLower.includes('merv13')) {
                      return "/air-filters?merv=13";
                    }
                    // Fallback for non-MERV categories
                    return "/air-filters";
                  })()}>
                     <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors px-4 py-3 sm:px-6 sm:py-4 min-h-touch">
                       Explore Products
                       <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                     </Button>
                  </Link>
                </div>
              </CardContent>
             </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-8 sm:mt-12">
          <Link to="/air-filters">
            <Button variant="hero" size="lg" className="px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 min-h-touch">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;