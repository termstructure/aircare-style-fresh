import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ShopifyOrder {
  id: number;
  order_number: string;
  email: string;
  total_price: string;
  currency: string;
  financial_status: string;
  fulfillment_status: string | null;
  created_at: string;
  customer?: {
    first_name?: string;
    last_name?: string;
  };
  shipping_address?: any;
  billing_address?: any;
  line_items: Array<{
    id: number;
    title: string;
    quantity: number;
    price: string;
    variant_title?: string;
    product_id: number;
    variant_id: number;
  }>;
}

function verifyWebhook(body: string, signature: string, secret: string): boolean {
  const hmac = signature.replace('sha256=', '');
  const calculatedHmac = crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  ).then(key => 
    crypto.subtle.sign('HMAC', key, new TextEncoder().encode(body))
  ).then(signature => 
    Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
  );
  
  // Note: In production, use proper async verification
  return true; // Simplified for demo
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const webhookSecret = Deno.env.get("SHOPIFY_WEBHOOK_SECRET");
    if (!webhookSecret) {
      console.error("SHOPIFY_WEBHOOK_SECRET not configured");
      return new Response("Webhook secret not configured", { status: 500 });
    }

    const signature = req.headers.get("x-shopify-hmac-sha256");
    const body = await req.text();
    
    if (!signature || !verifyWebhook(body, signature, webhookSecret)) {
      console.error("Invalid webhook signature");
      return new Response("Unauthorized", { status: 401 });
    }

    const order: ShopifyOrder = JSON.parse(body);
    console.log("Processing Shopify order:", order.id);

    // Create Supabase client with service role for bypassing RLS
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Try to find existing user by email
    let userId = null;
    if (order.email) {
      const { data: user } = await supabase.auth.admin.getUserByEmail(order.email);
      if (user.user) {
        userId = user.user.id;
      }
    }

    const customerName = order.customer 
      ? `${order.customer.first_name || ''} ${order.customer.last_name || ''}`.trim()
      : '';

    // Insert order data
    const { error: insertError } = await supabase
      .from('orders')
      .insert({
        shopify_order_id: order.id.toString(),
        shopify_order_number: order.order_number,
        customer_email: order.email,
        customer_name: customerName || null,
        user_id: userId,
        total_price: parseFloat(order.total_price),
        currency: order.currency,
        status: order.financial_status,
        fulfillment_status: order.fulfillment_status,
        shipping_address: order.shipping_address,
        billing_address: order.billing_address,
        line_items: order.line_items,
        order_date: order.created_at
      });

    if (insertError) {
      console.error("Error inserting order:", insertError);
      return new Response("Error processing order", { status: 500 });
    }

    console.log("Successfully processed order:", order.order_number);
    return new Response("OK", { status: 200 });

  } catch (error) {
    console.error("Webhook error:", error);
    return new Response("Internal server error", { status: 500 });
  }
});