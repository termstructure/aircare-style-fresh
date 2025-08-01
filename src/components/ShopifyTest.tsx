import { useEffect, useState } from 'react';

const ShopifyTest = () => {
  const [testResult, setTestResult] = useState<string>('Testing...');

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await fetch('https://aircaresupplyco.myshopify.com/api/2025-07/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': '5cbbba0740deb6023c3f3e36a613e33d',
          },
          body: JSON.stringify({
            query: `
              query {
                shop {
                  name
                }
              }
            `
          })
        });

        if (response.ok) {
          const data = await response.json();
          setTestResult(`SUCCESS: ${JSON.stringify(data)}`);
        } else {
          setTestResult(`HTTP ERROR: ${response.status} - ${response.statusText}`);
        }
      } catch (error) {
        setTestResult(`NETWORK ERROR: ${error}`);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded">
      <h3 className="font-bold mb-2">Shopify Connection Test</h3>
      <pre className="text-sm whitespace-pre-wrap">{testResult}</pre>
    </div>
  );
};

export default ShopifyTest;
