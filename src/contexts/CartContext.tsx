import * as React from 'react';
import { ShopifyProduct, shopifyClient } from '@/lib/shopify';

export interface CartItem {
  id: string;
  product: ShopifyProduct;
  variantId: string;
  quantity: number;
  price: string;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: string;
  isSyncing: boolean;
  addToCart: (product: ShopifyProduct, variantId: string, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCheckoutUrl: () => Promise<string>;
}

const CartContext = React.createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = React.useState<CartItem[]>([]);
  const [checkoutId, setCheckoutId] = React.useState<string | null>(() => (typeof window !== 'undefined' ? localStorage.getItem('checkoutId') : null));
  const [checkoutUrl, setCheckoutUrl] = React.useState<string>(() => ((typeof window !== 'undefined' ? localStorage.getItem('checkoutUrl') : '') || ''));
  const [isSyncing, setIsSyncing] = React.useState<boolean>(false);

  const toStorefrontId = React.useCallback((id: string) => {
    if (!id) return id;
    if (id.startsWith('gid://')) {
      try {
        return btoa(id);
      } catch {
        return id;
      }
    }
    return id;
  }, []);

  const createCheckoutFromItems = React.useCallback(async () => {
    if (items.length === 0) {
      setCheckoutId(null);
      setCheckoutUrl('');
      if (typeof window !== 'undefined') {
        localStorage.removeItem('checkoutId');
        localStorage.removeItem('checkoutUrl');
      }
      return '';
    }
    try {
      setIsSyncing(true);
      const lineItems = items.map(item => ({
        variantId: toStorefrontId(item.variantId),
        quantity: item.quantity,
      }));
      const checkout = await shopifyClient.checkout.create({ lineItems });
      const url = checkout?.webUrl || '';
      const id = checkout?.id || null;
      setCheckoutUrl(url);
      setCheckoutId(id);
      if (typeof window !== 'undefined') {
        if (id) localStorage.setItem('checkoutId', id);
        if (url) localStorage.setItem('checkoutUrl', url);
      }
      return url;
    } catch (err) {
      console.error('Failed to sync Shopify checkout, falling back later.', err);
      return '';
    } finally {
      setIsSyncing(false);
    }
  }, [items, toStorefrontId]);

  React.useEffect(() => {
    // Pre-create checkout whenever cart changes
    void createCheckoutFromItems();
  }, [createCheckoutFromItems]);

  const addToCart = React.useCallback((product: ShopifyProduct, variantId: string, quantity = 1) => {
    const variant = product.variants.find(v => v.id === variantId);
    if (!variant) return;

    setItems(currentItems => {
      const existingItem = currentItems.find(item => 
        item.product.id === product.id && item.variantId === variantId
      );

      if (existingItem) {
        return currentItems.map(item =>
          item.id === existingItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: `${product.id}-${variantId}`,
          product,
          variantId,
          quantity,
          price: variant.price,
        };
        return [...currentItems, newItem];
      }
    });
  }, []);

  const removeFromCart = React.useCallback((itemId: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== itemId));
  }, []);

  const updateQuantity = React.useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = React.useCallback(() => {
    setItems([]);
    setCheckoutId(null);
    setCheckoutUrl('');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('checkoutId');
      localStorage.removeItem('checkoutUrl');
    }
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const totalPrice = items.reduce((sum, item) => {
    return sum + (parseFloat(item.price) * item.quantity);
  }, 0).toFixed(2);

  // Return a ready checkout URL, creating one if missing, with graceful fallback
  const getCheckoutUrl = React.useCallback(async () => {
    try {
      if (items.length === 0) return '';

      if (checkoutUrl) {
        return checkoutUrl;
      }

      const url = await createCheckoutFromItems();
      if (url) return url;

      // Fallback to old cart permalink approach
      const cartString = items
        .map(item => {
          const numericId = item.variantId.split('/').pop();
          return `${numericId}:${item.quantity}`;
        })
        .join(',');
      return `https://aircaresupplyco.myshopify.com/cart/${cartString}`;
    } catch (err) {
      console.error('Failed to get Shopify checkout URL, falling back to cart permalink.', err);
      const cartString = items
        .map(item => {
          const numericId = item.variantId.split('/').pop();
          return `${numericId}:${item.quantity}`;
        })
        .join(',');
      return `https://aircaresupplyco.myshopify.com/cart/${cartString}`;
    }
  }, [items, checkoutUrl, createCheckoutFromItems]);

  const value: CartContextType = {
    items,
    totalItems,
    totalPrice,
    isSyncing,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCheckoutUrl,
  };

  return React.createElement(CartContext.Provider, { value }, children);
};