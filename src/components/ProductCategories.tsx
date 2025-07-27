import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import filtersImg from "@/assets/filters.jpg";
import hvacSystemsImg from "@/assets/hvac-systems.jpg";
import accessoriesImg from "@/assets/accessories.jpg";

const categories = [
  {
    title: "Air Filters",
    description: "Premium HEPA, pleated, and specialty filters for all HVAC systems. Available in all standard sizes.",
    image: filtersImg,
    features: ["HEPA Certified", "Custom Sizes", "Bulk Pricing"]
  },
  {
    title: "HVAC Systems",
    description: "Complete heating, ventilation, and air conditioning systems for residential and commercial use.",
    image: hvacSystemsImg,
    features: ["Energy Efficient", "Professional Grade", "Full Warranty"]
  },
  {
    title: "Parts & Accessories",
    description: "Quality replacement parts, tools, and accessories to keep your HVAC systems running smoothly.",
    image: accessoriesImg,
    features: ["OEM Quality", "Fast Shipping", "Expert Support"]
  }
];

const ProductCategories = () => {
  return (
    <section id="products" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-1 bg-primary rounded-full" />
            <span className="text-primary font-medium">Our Products</span>
            <div className="w-12 h-1 bg-primary rounded-full" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Sophisticated Air Solutions
          </h2>
          <p className="text-xl font-body text-muted-foreground max-w-3xl mx-auto">
            Curated collection of premium air purification and climate solutions designed 
            for the discerning homeowner who values both performance and aesthetics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Card key={index} className="group hover:shadow-elegant transition-all duration-300 border-0 bg-card">
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
                  <h3 className="text-2xl font-bold text-foreground mb-3">{category.title}</h3>
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
                  
                  <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Explore Products
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="hero" size="lg" className="px-8 py-4">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;