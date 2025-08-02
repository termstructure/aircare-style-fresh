import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Loader2 } from "lucide-react";
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
    features: ["Energy Efficient", "Professional Grade", "Reliable Quality"]
  },
  {
    id: "accessories",
    title: "Parts & Accessories", 
    description: "Quality replacement parts, tools, and accessories to keep your HVAC systems running smoothly.",
    image: accessoriesImg,
    handle: "accessories",
    features: ["OEM Quality", "Fast Shipping", "Expert Support"]
  }
];

const ProductCategories = () => {
  const { data: shopifyCollections, isLoading, error } = useCollections();
  
  // Use Shopify collections if available, otherwise fallback to static data
  // Filter out air-filters collection
  const categories = shopifyCollections?.length ? shopifyCollections
    .filter(collection => collection.handle !== "air-filters")
    .map(collection => ({
      id: collection.id,
      title: collection.title,
      description: collection.description || fallbackCategories.find(cat => cat.handle === collection.handle)?.description || "Premium quality products for your needs.",
      image: collection.image?.src || fallbackCategories.find(cat => cat.handle === collection.handle)?.image || filtersImg,
      handle: collection.handle,
      features: fallbackCategories.find(cat => cat.handle === collection.handle)?.features || ["Premium Quality", "Fast Shipping", "Expert Support"]
    })) : fallbackCategories;

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
    <section id="products" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-1 bg-primary rounded-full" />
            <span className="text-primary font-medium">Our Products</span>
            <div className="w-12 h-1 bg-primary rounded-full" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Sophisticated Air Solutions
          </h2>
          <p className="text-xl font-body text-muted-foreground max-w-3xl mx-auto">
            Curated collection of premium air purification and climate solutions designed 
            for the discerning homeowner who values both performance and aesthetics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Card key={category.id || index} className="group hover:shadow-elegant transition-all duration-300 border-0 bg-card">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">{category.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{category.description}</p>
                  
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
                  
                  {/* Create dynamic links based on category */}
                  <Link to={
                    category.handle === "hvac-systems" ? "/air-filters?category=Basic Protection" :
                    category.handle === "accessories" ? "/air-filters?category=Premium Allergen" :
                    category.title === "HVAC Systems" ? "/air-filters?category=Basic Protection" :
                    category.title === "Parts & Accessories" ? "/air-filters?category=Premium Allergen" :
                    "/air-filters"
                  }>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Explore Products
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/air-filters">
            <Button variant="hero" size="lg" className="px-8 py-4">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;