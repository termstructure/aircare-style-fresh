import React from 'react';
import { ShoppingCart, Plus, Minus, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/contexts/CartContext';
import { formatPrice, getProductImageUrl } from '@/lib/shopify';
import { useToast } from '@/hooks/use-toast';

interface CartProps {
  children?: React.ReactNode;
}

const Cart: React.FC<CartProps> = ({ children }) => {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, getCheckoutUrl } = useCart();
  const { toast } = useToast();

  const handleCheckout = async () => {
    const checkoutUrl = await getCheckoutUrl();
    if (checkoutUrl) {
      console.log('Redirecting to Shopify checkout:', checkoutUrl);
      window.open(checkoutUrl, '_blank');
      toast({
        title: "Redirecting to Checkout",
        description: "Opening Shopify checkout in a new tab...",
      });
    } else {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart before checking out.",
        variant: "destructive",
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children || (
          <Button variant="outline" size="sm" className="relative min-h-touch px-3 py-2">
            <ShoppingCart className="w-4 h-4" />
            {totalItems > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs"
              >
                {totalItems}
              </Badge>
            )}
          </Button>
        )}
      </SheetTrigger>
      
      <SheetContent side="right" className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Your Cart ({totalItems} items)
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto py-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="flex gap-3">
                      <img
                        src={getProductImageUrl(item.product)}
                        alt={item.product.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-xs sm:text-sm line-clamp-2">
                          {item.product.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {formatPrice(item.price)}
                        </p>
                        
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 p-0"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 p-0"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-destructive hover:text-destructive w-8 h-8 p-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {items.length > 0 && (
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Total:</span>
                <span className="font-bold text-base sm:text-lg">{formatPrice(totalPrice)}</span>
              </div>
              
              <Button 
                onClick={handleCheckout}
                className="w-full"
                size="lg"
              >
                Checkout
              </Button>
              
              <p className="text-xs text-muted-foreground text-center mt-2">
                You'll be redirected to Shopify to complete your purchase
              </p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;