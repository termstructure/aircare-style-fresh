import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, ShoppingCart, Check, Truck, Shield, RotateCcw } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useProductsByCollectionWithFallback } from '@/hooks/useShopifyWithFallback';
import { useCart } from '@/contexts/CartContext';
import { ShopifyProduct } from '@/lib/shopify';
import { formatPrice, getProductImageUrl } from '@/lib/shopify';

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');

  // Fetch products to find the one we need
  const { data: products, isLoading, error } = useProductsByCollectionWithFallback("air-filters");
  
  const product = products?.find(p => p.handle === handle);

  useEffect(() => {
    if (product && product.variants.length > 0) {
      setSelectedVariantId(product.variants[0].id);
    }
  }, [product]);

  // Helper function to extract MERV rating from tags or title
  const getMervRating = (product: ShopifyProduct): number => {
    const mervTag = product.tags.find(tag => tag.toLowerCase().startsWith('merv-'));
    if (mervTag) {
      const rating = parseInt(mervTag.replace('merv-', ''));
      return isNaN(rating) ? 0 : rating;
    }
    
    const mervMatch = product.title.match(/merv\s*(\d+)/i);
    return mervMatch ? parseInt(mervMatch[1]) : 0;
  };

  // Helper function to extract size from tags or title
  const getSize = (product: ShopifyProduct): string => {
    const sizeTag = product.tags.find(tag => /\d+x\d+x\d+/.test(tag));
    if (sizeTag) return sizeTag;
    
    const sizeMatch = product.title.match(/(\d+x\d+x\d+)/);
    return sizeMatch ? sizeMatch[1] : "";
  };

  const handleAddToCart = () => {
    if (!product || !selectedVariantId) return;

    const selectedVariant = product.variants.find(v => v.id === selectedVariantId);
    if (!selectedVariant?.available) {
      toast({
        title: "Out of Stock",
        description: "This product variant is currently unavailable.",
        variant: "destructive",
      });
      return;
    }

    addToCart(product, selectedVariantId, quantity);
    toast({
      title: "Added to Cart",
      description: `${quantity} × ${product.title} added to your cart.`,
    });
  };

  const updateQuantity = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-muted rounded"></div>
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/air-filters">Back to Air Filters</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const selectedVariant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0];
  const mervRating = getMervRating(product);
  const size = getSize(product);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <span className="text-muted-foreground">/</span>
          <Link to="/air-filters" className="text-sm text-muted-foreground hover:text-foreground">
            Air Filters
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm text-foreground">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img
                src={getProductImageUrl(product)}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Additional images if available */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(1, 5).map((image, index) => (
                  <div key={image.id} className="aspect-square bg-muted rounded overflow-hidden">
                    <img
                      src={image.src}
                      alt={`${product.title} ${index + 2}`}
                      className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="secondary">{product.vendor}</Badge>
                {mervRating > 0 && (
                  <Badge variant="outline">MERV {mervRating}</Badge>
                )}
                {size && (
                  <Badge variant="outline">{size}</Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">{product.title}</h1>
              <div className="text-3xl font-bold text-primary mb-4">
                {formatPrice(selectedVariant.price)}
              </div>
              {selectedVariant.available ? (
                <div className="flex items-center text-green-600">
                  <Check className="w-4 h-4 mr-2" />
                  In Stock
                </div>
              ) : (
                <div className="text-destructive">Out of Stock</div>
              )}
            </div>

            {/* Product Description */}
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Variants Selection */}
            {product.variants.length > 1 && (
              <div>
                <label className="text-sm font-medium mb-3 block">Options</label>
                <div className="grid grid-cols-2 gap-2">
                  {product.variants.map((variant) => (
                    <Button
                      key={variant.id}
                      variant={selectedVariantId === variant.id ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => setSelectedVariantId(variant.id)}
                      disabled={!variant.available}
                    >
                      <div className="text-left">
                        <div className="font-medium">{variant.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatPrice(variant.price)}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-3 block">Quantity</label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={!selectedVariant.available}
                className="w-full"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart - {formatPrice((parseFloat(selectedVariant.price) * quantity).toString())}
              </Button>
            </div>

            {/* Product Features */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Product Features</h3>
                <div className="space-y-3">
                  {mervRating > 0 && (
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-primary" />
                      <span className="text-sm">MERV {mervRating} Filtration Rating</span>
                    </div>
                  )}
                  {size && (
                    <div className="flex items-center gap-3">
                      <RotateCcw className="w-5 h-5 text-primary" />
                      <span className="text-sm">Standard {size} Filter Size</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-primary" />
                    <span className="text-sm">Free shipping on orders over $50</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technical Specifications */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Specifications</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Brand:</span>
                    <span className="ml-2 font-medium">{product.vendor}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Type:</span>
                    <span className="ml-2 font-medium">{product.productType}</span>
                  </div>
                  {size && (
                    <div>
                      <span className="text-muted-foreground">Size:</span>
                      <span className="ml-2 font-medium">{size}</span>
                    </div>
                  )}
                  {mervRating > 0 && (
                    <div>
                      <span className="text-muted-foreground">MERV Rating:</span>
                      <span className="ml-2 font-medium">{mervRating}</span>
                    </div>
                  )}
                  {selectedVariant.sku && (
                    <div>
                      <span className="text-muted-foreground">SKU:</span>
                      <span className="ml-2 font-medium">{selectedVariant.sku}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;