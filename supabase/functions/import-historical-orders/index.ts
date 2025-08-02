import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ShopifyOrder {
  id: number;
  order_number: string;
  email: string;
  created_at: string;
  updated_at: string;
  total_price: string;
  currency: string;
  financial_status: string;
  fulfillment_status?: string;
  customer?: {
    id: number;
    email: string;
    first_name?: string;
    last_name?: string;
  };
  billing_address?: any;
  shipping_address?: any;
  line_items: any[];
}

interface ImportResult {
  total_processed: number;
  successful_imports: number;
  skipped_duplicates: number;
  errors: Array<{ order_id: number; error: string }>;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get environment variables
    const shopifyAdminToken = Deno.env.get('SHOPIFY_ADMIN_ACCESS_TOKEN');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!shopifyAdminToken || !supabaseUrl || !supabaseServiceKey) {
      return new Response(
        JSON.stringify({ error: 'Missing required environment variables' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Starting historical orders import...');

    const result: ImportResult = {
      total_processed: 0,
      successful_imports: 0,
      skipped_duplicates: 0,
      errors: []
    };

    // Get existing order IDs to avoid duplicates
    const { data: existingOrders, error: existingOrdersError } = await supabase
      .from('orders')
      .select('shopify_order_id');

    if (existingOrdersError) {
      console.error('Error fetching existing orders:', existingOrdersError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch existing orders' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const existingOrderIds = new Set(existingOrders?.map(o => o.shopify_order_id) || []);

    // Fetch orders from Shopify Admin API with pagination
    let hasNextPage = true;
    let pageInfo = '';
    const limit = 250; // Shopify's maximum

    while (hasNextPage) {
      try {
        let url = `https://aircaresupplyco.myshopify.com/admin/api/2024-01/orders.json?limit=${limit}&status=any`;
        if (pageInfo) {
          url += `&page_info=${pageInfo}`;
        }

        console.log(`Fetching orders from: ${url}`);

        const shopifyResponse = await fetch(url, {
          headers: {
            'X-Shopify-Access-Token': shopifyAdminToken,
            'Content-Type': 'application/json',
          },
        });

        if (!shopifyResponse.ok) {
          const errorText = await shopifyResponse.text();
          console.error(`Shopify API error: ${shopifyResponse.status} - ${errorText}`);
          break;
        }

        const shopifyData = await shopifyResponse.json();
        const orders: ShopifyOrder[] = shopifyData.orders || [];

        console.log(`Processing ${orders.length} orders from this batch...`);

        // Process each order
        for (const order of orders) {
          result.total_processed++;

          // Skip if already exists
          if (existingOrderIds.has(order.id.toString())) {
            result.skipped_duplicates++;
            console.log(`Skipping duplicate order: ${order.id}`);
            continue;
          }

          try {
            // Find or create user based on email
            let userId = null;
            if (order.email) {
              // Try to find existing user by email
              const { data: existingUser } = await supabase.auth.admin.getUserByEmail(order.email);
              if (existingUser.user) {
                userId = existingUser.user.id;
              }
            }

            // Insert order into Supabase
            const { error: insertError } = await supabase
              .from('orders')
              .insert({
                shopify_order_id: order.id.toString(),
                shopify_order_number: order.order_number,
                user_id: userId,
                customer_email: order.email,
                customer_name: order.customer ? 
                  `${order.customer.first_name || ''} ${order.customer.last_name || ''}`.trim() : 
                  null,
                order_date: order.created_at,
                total_price: parseFloat(order.total_price),
                currency: order.currency,
                status: order.financial_status,
                fulfillment_status: order.fulfillment_status,
                billing_address: order.billing_address,
                shipping_address: order.shipping_address,
                line_items: order.line_items,
              });

            if (insertError) {
              console.error(`Error inserting order ${order.id}:`, insertError);
              result.errors.push({
                order_id: order.id,
                error: insertError.message
              });
            } else {
              result.successful_imports++;
              console.log(`Successfully imported order: ${order.id}`);
            }
          } catch (error) {
            console.error(`Error processing order ${order.id}:`, error);
            result.errors.push({
              order_id: order.id,
              error: error.message
            });
          }
        }

        // Check for next page
        const linkHeader = shopifyResponse.headers.get('Link');
        if (linkHeader && linkHeader.includes('rel="next"')) {
          // Extract page_info from the link header
          const nextMatch = linkHeader.match(/page_info=([^&>]+).*rel="next"/);
          if (nextMatch) {
            pageInfo = nextMatch[1];
          } else {
            hasNextPage = false;
          }
        } else {
          hasNextPage = false;
        }

        // If no orders in this batch, we're done
        if (orders.length === 0) {
          hasNextPage = false;
        }

      } catch (error) {
        console.error('Error fetching from Shopify API:', error);
        result.errors.push({
          order_id: 0,
          error: `API fetch error: ${error.message}`
        });
        break;
      }
    }

    console.log('Historical orders import completed:', result);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Historical orders import completed',
        result
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Import function error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});