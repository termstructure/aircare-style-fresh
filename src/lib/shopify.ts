import { createStorefrontApiClient } from '@shopify/storefront-api-client';
import Client from 'shopify-buy';

// Shopify store configuration
const SHOP_DOMAIN = 'http://aircaresupplyco.myshopify.com';
const STOREFRONT_ACCESS_TOKEN = '5cbbba0740deb6023c3f3e36a613e33d'; // You'll need to provide this

// Create Shopify Buy SDK client
export const shopifyClient = Client.buildClient({
  domain: SHOP_DOMAIN,
  storefrontAccessToken: STOREFRONT_ACCESS_TOKEN,
});

// Create Storefront API client for more advanced queries
export const storefrontClient = createStorefrontApiClient({
  storeDomain: SHOP_DOMAIN,
  apiVersion: '2024-01',
  publicAccessToken: STOREFRONT_ACCESS_TOKEN,
});

// Product type definitions for Shopify
export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  productType: string;
  vendor: string;
  tags: string[];
  images: {
    id: string;
    src: string;
    altText?: string;
  }[];
  variants: {
    id: string;
    title: string;
    price: string;
    available: boolean;
    sku?: string;
    inventory_quantity?: number;
    selectedOptions: {
      name: string;
      value: string;
    }[];
  }[];
  options: {
    id: string;
    name: string;
    values: string[];
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image?: {
    src: string;
    altText?: string;
  };
}

// Cart type definitions
export interface CartItem {
  variant: any;
  quantity: number;
}

export interface Cart {
  id: string;
  lineItems: CartItem[];
  subtotalPrice: string;
  totalPrice: string;
  webUrl: string;
}

// Error handling
export class ShopifyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ShopifyError';
  }
}

// Helper functions
export const formatPrice = (price: string | number): string => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(numPrice);
};

export const getProductImageUrl = (product: ShopifyProduct): string => {
  return product.images?.[0]?.src || '/placeholder.svg';
};

export const getVariantBySelectedOptions = (
  product: ShopifyProduct,
  selectedOptions: Record<string, string>
) => {
  return product.variants.find(variant => {
    return variant.selectedOptions.every(option => 
      selectedOptions[option.name] === option.value
    );
  });
};
