import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ShopifyProduct, ShopifyCollection, Cart, ShopifyError } from '@/lib/shopify';

// Enhanced error handling and retry logic for Shopify operations
const RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 1000; // 1 second

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const retryOperation = async <T>(
  operation: () => Promise<T>,
  attempts: number = RETRY_ATTEMPTS
): Promise<T> => {
  for (let i = 0; i < attempts; i++) {
    try {
      return await operation();
    } catch (error) {
      console.warn(`Attempt ${i + 1} failed:`, error);
      
      if (i === attempts - 1) {
        throw new ShopifyError(`Operation failed after ${attempts} attempts: ${error}`);
      }
      
      await sleep(RETRY_DELAY * (i + 1)); // Exponential backoff
    }
  }
  throw new ShopifyError('Unexpected error in retry logic');
};

// Direct GraphQL queries as fallback when SDK fails
const graphqlQuery = async (query: string, variables?: any) => {
  return retryOperation(async () => {
    const response = await fetch('https://aircaresupplyco.myshopify.com/api/2025-07/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': '5cbbba0740deb6023c3f3e36a613e33d',
      },
      body: JSON.stringify({ query, variables })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      throw new Error(`GraphQL errors: ${data.errors.map((e: any) => e.message).join(', ')}`);
    }

    return data.data;
  });
};

// Enhanced hook for fetching products by collection with fallback
export const useProductsByCollectionWithFallback = (collectionHandle: string) => {
  return useQuery({
    queryKey: ['products', 'collection', collectionHandle, 'with-fallback'],
    queryFn: async (): Promise<ShopifyProduct[]> => {
      try {
        // First try: Direct GraphQL query
        const data = await graphqlQuery(`
          query getCollectionProducts($handle: String!) {
            collection(handle: $handle) {
              products(first: 50) {
                edges {
                  node {
                     id
                     title
                     description
                     descriptionHtml
                     handle
                    productType
                    vendor
                    tags
                    createdAt
                    updatedAt
                    images(first: 5) {
                      edges {
                        node {
                          id
                          url
                          altText
                        }
                      }
                    }
                    variants(first: 10) {
                      edges {
                        node {
                          id
                          title
                          price {
                            amount
                            currencyCode
                          }
                          availableForSale
                          sku
                          quantityAvailable
                          selectedOptions {
                            name
                            value
                          }
                        }
                      }
                    }
                    options {
                      id
                      name
                      values
                    }
                  }
                }
              }
            }
          }
        `, { handle: collectionHandle });

        if (!data.collection) {
          throw new ShopifyError(`Collection '${collectionHandle}' not found`);
        }

        return data.collection.products.edges.map((edge: any) => {
          const product = edge.node;
          return {
            id: product.id,
            title: product.title,
            description: product.description,
            descriptionHtml: product.descriptionHtml,
            handle: product.handle,
            productType: product.productType,
            vendor: product.vendor,
            tags: product.tags,
            images: product.images.edges.map((imgEdge: any) => ({
              id: imgEdge.node.id,
              src: imgEdge.node.url,
              altText: imgEdge.node.altText,
            })),
            variants: product.variants.edges.map((variantEdge: any) => {
              const variant = variantEdge.node;
              return {
                id: variant.id,
                title: variant.title,
                price: variant.price.amount,
                available: variant.availableForSale,
                sku: variant.sku,
                inventory_quantity: variant.quantityAvailable,
                selectedOptions: variant.selectedOptions,
              };
            }),
            options: product.options,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
          };
        });
      } catch (error) {
        console.error('GraphQL fallback failed:', error);
        throw new ShopifyError(`Failed to fetch collection products: ${error}`);
      }
    },
    enabled: !!collectionHandle,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Enhanced collections fetching with fallback
export const useCollectionsWithFallback = () => {
  return useQuery({
    queryKey: ['collections', 'with-fallback'],
    queryFn: async (): Promise<ShopifyCollection[]> => {
      try {
        const data = await graphqlQuery(`
          query getCollections {
            collections(first: 20) {
              edges {
                node {
                  id
                  handle
                  title
                  description
                  image {
                    url
                    altText
                  }
                }
              }
            }
          }
        `);

        return data.collections.edges.map((edge: any) => {
          const collection = edge.node;
          return {
            id: collection.id,
            handle: collection.handle,
            title: collection.title,
            description: collection.description,
            image: collection.image ? {
              src: collection.image.url,
              altText: collection.image.altText,
            } : undefined,
          };
        });
      } catch (error) {
        console.error('Collections fallback failed:', error);
        throw new ShopifyError(`Failed to fetch collections: ${error}`);
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Test connection hook
export const useShopifyConnectionTest = () => {
  const [connectionStatus, setConnectionStatus] = useState<{
    isConnected: boolean;
    error?: string;
    shopName?: string;
  }>({ isConnected: false });

  useEffect(() => {
    const testConnection = async () => {
      try {
        const data = await graphqlQuery(`
          query {
            shop {
              name
              description
            }
          }
        `);
        
        setConnectionStatus({
          isConnected: true,
          shopName: data.shop.name
        });
      } catch (error) {
        setConnectionStatus({
          isConnected: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    };

    testConnection();
  }, []);

  return connectionStatus;
};