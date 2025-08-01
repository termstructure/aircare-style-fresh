import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface TestResult {
  name: string;
  status: 'pending' | 'success' | 'error' | 'warning';
  message: string;
  details?: any;
}

const ShopifyTest = () => {
  const [tests, setTests] = useState<TestResult[]>([
    { name: 'Shop Connection', status: 'pending', message: 'Testing...' },
    { name: 'Collections Access', status: 'pending', message: 'Waiting...' },
    { name: 'Air Filters Collection', status: 'pending', message: 'Waiting...' },
    { name: 'Products in Collection', status: 'pending', message: 'Waiting...' },
  ]);

  const updateTest = (index: number, update: Partial<TestResult>) => {
    setTests(prev => prev.map((test, i) => i === index ? { ...test, ...update } : test));
  };

  useEffect(() => {
    const runTests = async () => {
      const baseUrl = 'https://aircaresupplyco.myshopify.com/api/2025-07/graphql';
      const headers = {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': '5cbbba0740deb6023c3f3e36a613e33d',
      };

      // Test 1: Basic shop connection
      try {
        const response = await fetch(baseUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            query: `query { shop { name description } }`
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.errors) {
            updateTest(0, { 
              status: 'error', 
              message: `GraphQL Errors: ${data.errors.map((e: any) => e.message).join(', ')}`,
              details: data.errors 
            });
          } else {
            updateTest(0, { 
              status: 'success', 
              message: `Connected to ${data.data.shop.name}`,
              details: data.data.shop 
            });
          }
        } else {
          updateTest(0, { 
            status: 'error', 
            message: `HTTP ${response.status}: ${response.statusText}` 
          });
          return; // Stop if basic connection fails
        }
      } catch (error) {
        updateTest(0, { 
          status: 'error', 
          message: `Network Error: ${error}` 
        });
        return;
      }

      // Test 2: Collections access
      try {
        const response = await fetch(baseUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            query: `query {
              collections(first: 5) {
                edges {
                  node {
                    id
                    handle
                    title
                  }
                }
              }
            }`
          })
        });

        const data = await response.json();
        if (data.errors) {
          updateTest(1, { 
            status: 'error', 
            message: `Collections Error: ${data.errors.map((e: any) => e.message).join(', ')}`,
            details: data.errors 
          });
        } else {
          const collections = data.data.collections.edges;
          updateTest(1, { 
            status: 'success', 
            message: `Found ${collections.length} collections`,
            details: collections.map((c: any) => c.node) 
          });
        }
      } catch (error) {
        updateTest(1, { status: 'error', message: `Collections fetch failed: ${error}` });
      }

      // Test 3: Specific air-filters collection
      try {
        const response = await fetch(baseUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            query: `query {
              collection(handle: "air-filters") {
                id
                title
                handle
                description
                productsCount
              }
            }`
          })
        });

        const data = await response.json();
        if (data.errors) {
          updateTest(2, { 
            status: 'error', 
            message: `Air Filters Collection Error: ${data.errors.map((e: any) => e.message).join(', ')}` 
          });
        } else if (!data.data.collection) {
          updateTest(2, { 
            status: 'warning', 
            message: 'Air Filters collection not found - check collection handle' 
          });
        } else {
          updateTest(2, { 
            status: 'success', 
            message: `Found "${data.data.collection.title}" with ${data.data.collection.productsCount} products`,
            details: data.data.collection 
          });
        }
      } catch (error) {
        updateTest(2, { status: 'error', message: `Air Filters collection test failed: ${error}` });
      }

      // Test 4: Products in air-filters collection
      try {
        const response = await fetch(baseUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            query: `query {
              collection(handle: "air-filters") {
                products(first: 3) {
                  edges {
                    node {
                      id
                      title
                      handle
                      availableForSale
                      variants(first: 1) {
                        edges {
                          node {
                            id
                            price {
                              amount
                              currencyCode
                            }
                            availableForSale
                          }
                        }
                      }
                    }
                  }
                }
              }
            }`
          })
        });

        const data = await response.json();
        if (data.errors) {
          updateTest(3, { 
            status: 'error', 
            message: `Products Error: ${data.errors.map((e: any) => e.message).join(', ')}` 
          });
        } else if (!data.data.collection) {
          updateTest(3, { 
            status: 'warning', 
            message: 'Cannot test products - collection not found' 
          });
        } else {
          const products = data.data.collection.products.edges;
          updateTest(3, { 
            status: products.length > 0 ? 'success' : 'warning', 
            message: products.length > 0 
              ? `Found ${products.length} products in air-filters collection` 
              : 'Air-filters collection exists but has no products',
            details: products.map((p: any) => p.node) 
          });
        }
      } catch (error) {
        updateTest(3, { status: 'error', message: `Products test failed: ${error}` });
      }
    };

    runTests();
  }, []);

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'pending': return <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: TestResult['status']) => {
    const variants = {
      pending: 'secondary',
      success: 'default',
      error: 'destructive',
      warning: 'outline'
    } as const;
    
    return variants[status] || 'secondary';
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Shopify Integration Diagnostics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {tests.map((test, index) => (
          <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
            <div className="mt-0.5">
              {getStatusIcon(test.status)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-sm">{test.name}</h4>
                <Badge variant={getStatusBadge(test.status)} className="text-xs">
                  {test.status.toUpperCase()}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{test.message}</p>
              {test.details && (
                <details className="text-xs">
                  <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                    View Details
                  </summary>
                  <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto">
                    {JSON.stringify(test.details, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          </div>
        ))}
        
        <div className="mt-6 p-3 bg-muted rounded-lg">
          <h5 className="font-medium text-sm mb-2">Next Steps:</h5>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• If shop connection fails: Check your Storefront Access Token permissions</li>
            <li>• If collections fail: Verify token has 'unauthenticated_read_product_listings' scope</li>
            <li>• If air-filters collection not found: Check the collection handle in Shopify admin</li>
            <li>• If no products found: Add products to the air-filters collection</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShopifyTest;
