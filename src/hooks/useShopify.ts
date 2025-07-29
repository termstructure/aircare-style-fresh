import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { shopifyClient, ShopifyProduct, ShopifyCollection, Cart, ShopifyError } from '@/lib/shopify';

// Hook for fetching all products
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async (): Promise<ShopifyProduct[]> => {
      try {
        const products = await shopifyClient.product.fetchAll();
        return products.map(product => ({
          id: product.id,
          title: product.title,
          description: product.description,
          handle: product.handle,
          productType: product.productType,
          vendor: product.vendor,
          tags: product.tags,
          images: product.images.map(img => ({
            id: img.id,
            src: img.src,
            altText: img.altText,
          })),
          variants: product.variants.map(variant => ({
            id: variant.id,
            title: variant.title,
            price: variant.price.amount,
            available: variant.available,
            sku: variant.sku,
            inventory_quantity: variant.inventory_quantity,
            selectedOptions: variant.selectedOptions,
          })),
          options: product.options,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
        }));
      } catch (error) {
        throw new ShopifyError(`Failed to fetch products: ${error}`);
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for fetching products by collection
export const useProductsByCollection = (collectionHandle: string) => {
  return useQuery({
    queryKey: ['products', 'collection', collectionHandle],
    queryFn: async (): Promise<ShopifyProduct[]> => {
      try {
        const collection = await shopifyClient.collection.fetchByHandle(collectionHandle);
        if (!collection) {
          throw new ShopifyError(`Collection not found: ${collectionHandle}`);
        }
        
        const products = await shopifyClient.product.fetchMultiple(
          collection.products.map(p => p.id)
        );
        
        return products.map(product => ({
          id: product.id,
          title: product.title,
          description: product.description,
          handle: product.handle,
          productType: product.productType,
          vendor: product.vendor,
          tags: product.tags,
          images: product.images.map(img => ({
            id: img.id,
            src: img.src,
            altText: img.altText,
          })),
          variants: product.variants.map(variant => ({
            id: variant.id,
            title: variant.title,
            price: variant.price.amount,
            available: variant.available,
            sku: variant.sku,
            inventory_quantity: variant.inventory_quantity,
            selectedOptions: variant.selectedOptions,
          })),
          options: product.options,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
        }));
      } catch (error) {
        throw new ShopifyError(`Failed to fetch collection products: ${error}`);
      }
    },
    enabled: !!collectionHandle,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook for fetching a single product
export const useProduct = (handle: string) => {
  return useQuery({
    queryKey: ['product', handle],
    queryFn: async (): Promise<ShopifyProduct | null> => {
      try {
        const product = await shopifyClient.product.fetchByHandle(handle);
        if (!product) return null;
        
        return {
          id: product.id,
          title: product.title,
          description: product.description,
          handle: product.handle,
          productType: product.productType,
          vendor: product.vendor,
          tags: product.tags,
          images: product.images.map(img => ({
            id: img.id,
            src: img.src,
            altText: img.altText,
          })),
          variants: product.variants.map(variant => ({
            id: variant.id,
            title: variant.title,
            price: variant.price.amount,
            available: variant.available,
            sku: variant.sku,
            inventory_quantity: variant.inventory_quantity,
            selectedOptions: variant.selectedOptions,
          })),
          options: product.options,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
        };
      } catch (error) {
        throw new ShopifyError(`Failed to fetch product: ${error}`);
      }
    },
    enabled: !!handle,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook for fetching collections
export const useCollections = () => {
  return useQuery({
    queryKey: ['collections'],
    queryFn: async (): Promise<ShopifyCollection[]> => {
      try {
        const collections = await shopifyClient.collection.fetchAll();
        return collections.map(collection => ({
          id: collection.id,
          handle: collection.handle,
          title: collection.title,
          description: collection.description,
          image: collection.image ? {
            src: collection.image.src,
            altText: collection.image.altText,
          } : undefined,
        }));
      } catch (error) {
        throw new ShopifyError(`Failed to fetch collections: ${error}`);
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Cart management hook
export const useCart = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const queryClient = useQueryClient();

  // Initialize cart
  useEffect(() => {
    const initializeCart = async () => {
      try {
        const existingCart = localStorage.getItem('shopify-cart');
        if (existingCart) {
          const cartId = JSON.parse(existingCart).id;
          const fetchedCart = await shopifyClient.checkout.fetch(cartId);
          setCart(fetchedCart as Cart);
        } else {
          const newCart = await shopifyClient.checkout.create();
          setCart(newCart as Cart);
          localStorage.setItem('shopify-cart', JSON.stringify({ id: newCart.id }));
        }
      } catch (error) {
        console.error('Failed to initialize cart:', error);
        // Create new cart if fetching existing one fails
        try {
          const newCart = await shopifyClient.checkout.create();
          setCart(newCart as Cart);
          localStorage.setItem('shopify-cart', JSON.stringify({ id: newCart.id }));
        } catch (createError) {
          console.error('Failed to create new cart:', createError);
        }
      }
    };

    initializeCart();
  }, []);

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: async ({ variantId, quantity }: { variantId: string; quantity: number }) => {
      if (!cart) throw new Error('Cart not initialized');
      
      const lineItemsToAdd = [{
        variantId: variantId,
        quantity: quantity,
      }];
      
      const updatedCart = await shopifyClient.checkout.addLineItems(cart.id, lineItemsToAdd);
      return updatedCart;
    },
    onSuccess: (updatedCart) => {
      setCart(updatedCart as Cart);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  // Update cart item mutation
  const updateCartMutation = useMutation({
    mutationFn: async ({ lineItemId, quantity }: { lineItemId: string; quantity: number }) => {
      if (!cart) throw new Error('Cart not initialized');
      
      const lineItemsToUpdate = [{
        id: lineItemId,
        quantity: quantity,
      }];
      
      const updatedCart = await shopifyClient.checkout.updateLineItems(cart.id, lineItemsToUpdate);
      return updatedCart;
    },
    onSuccess: (updatedCart) => {
      setCart(updatedCart as Cart);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  // Remove from cart mutation
  const removeFromCartMutation = useMutation({
    mutationFn: async (lineItemId: string) => {
      if (!cart) throw new Error('Cart not initialized');
      
      const updatedCart = await shopifyClient.checkout.removeLineItems(cart.id, [lineItemId]);
      return updatedCart;
    },
    onSuccess: (updatedCart) => {
      setCart(updatedCart as Cart);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  return {
    cart,
    addToCart: addToCartMutation.mutate,
    updateCartItem: updateCartMutation.mutate,
    removeFromCart: removeFromCartMutation.mutate,
    isLoading: addToCartMutation.isPending || updateCartMutation.isPending || removeFromCartMutation.isPending,
    error: addToCartMutation.error || updateCartMutation.error || removeFromCartMutation.error,
  };
};