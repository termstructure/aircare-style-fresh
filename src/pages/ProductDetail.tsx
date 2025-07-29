import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Star, Shield, Truck, RefreshCw, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

// Import images
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
  brand: string;
  category: string;
  features: string[];
  image: string;
  subscription?: boolean;
  popular?: boolean;
}

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  // Sample product data - in a real app, this would come from an API or context
  const airFilters: AirFilter[] = [
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
      id: "f13-16x20",
      name: "3M Filtrete MERV 13 Superior Allergen Filter",
      size: "16x20x1",
      mervRating: 13,
      fprRating: 10,
      price: 34.99,
      brand: "3M Filtrete",
      category: "Superior Allergen",
      features: ["Captures 98% of particles", "Bacteria & viruses", "Smoke & smog", "Pet allergens"],
      image: filtreteM13,
      subscription: true,
      popular: false
    }
  ];

  const product = airFilters.find(filter => filter.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <Button onClick={() => navigate('/air-filters')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Air Filters
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${quantity}x ${product.name} added to your cart.`,
    });
  };

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "This filter has made a huge difference in our home's air quality. My allergies are much better!",
      date: "2 weeks ago"
    },
    {
      name: "Mike Chen",
      rating: 5,
      comment: "Easy to install and works great. The subscription service is convenient too.",
      date: "1 month ago"
    },
    {
      name: "Emily Rodriguez",
      rating: 4,
      comment: "Good quality filter, fits perfectly. Will definitely order again.",
      date: "3 weeks ago"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/air-filters')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Air Filters
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden border">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-muted rounded border cursor-pointer hover:border-primary">
                  <img 
                    src={product.image} 
                    alt={`${product.name} view ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{product.brand}</Badge>
                {product.popular && <Badge variant="default">Popular</Badge>}
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">(128 reviews)</span>
                </div>
              </div>
              <p className="text-4xl font-bold text-primary mb-4">${product.price}</p>
            </div>

            {/* Product Specifications */}
            <Card>
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Size:</span>
                  <span className="font-medium">{product.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">MERV Rating:</span>
                  <span className="font-medium">{product.mervRating}</span>
                </div>
                {product.fprRating && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">FPR Rating:</span>
                    <span className="font-medium">{product.fprRating}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium">{product.category}</span>
                </div>
              </CardContent>
            </Card>

            {/* Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
                <Button onClick={handleAddToCart} className="flex-1">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
              
              {product.subscription && (
                <div className="bg-accent p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <RefreshCw className="w-4 h-4 text-primary" />
                    <span className="font-medium">Subscribe & Save</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Get 15% off and free delivery with subscription. Cancel anytime.
                  </p>
                </div>
              )}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Quality Guaranteed</p>
              </div>
              <div className="text-center">
                <Truck className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Free Shipping</p>
              </div>
              <div className="text-center">
                <RefreshCw className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="features" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="features">Features & Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="specifications">Full Specifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="features" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Separator className="my-6" />
                <div className="prose max-w-none">
                  <h4 className="font-semibold mb-3">Product Description</h4>
                  <p className="text-muted-foreground">
                    This premium air filter is designed to capture airborne particles and improve your home's air quality. 
                    With advanced electrostatic technology, it attracts and captures microscopic particles that can trigger 
                    allergies and respiratory issues. Perfect for households with pets, smokers, or allergy sufferers.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="border-b pb-6 last:border-b-0">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{testimonial.name}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star} 
                                  className={`w-4 h-4 ${star <= testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">{testimonial.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{testimonial.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Dimensions</span>
                      <span>{product.size}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">MERV Rating</span>
                      <span>{product.mervRating}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Material</span>
                      <span>Synthetic blend</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Frame Type</span>
                      <span>Cardboard</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Efficiency</span>
                      <span>93% particle capture</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Airflow</span>
                      <span>Optimized</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Recommended Change</span>
                      <span>Every 3 months</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Warranty</span>
                      <span>1 year limited</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;