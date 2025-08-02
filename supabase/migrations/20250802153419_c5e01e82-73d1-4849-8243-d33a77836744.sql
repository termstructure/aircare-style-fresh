-- Create orders table to store Shopify order data via webhooks
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  shopify_order_id TEXT UNIQUE NOT NULL,
  shopify_order_number TEXT,
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  total_price DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'pending',
  fulfillment_status TEXT,
  shipping_address JSONB,
  billing_address JSONB,
  line_items JSONB NOT NULL,
  order_date TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Users can view their own orders (matched by email or user_id)
CREATE POLICY "Users can view their own orders" 
ON public.orders 
FOR SELECT 
USING (
  auth.uid() = user_id OR 
  customer_email = (SELECT email FROM auth.users WHERE id = auth.uid())
);

-- Edge functions can insert orders
CREATE POLICY "Edge functions can insert orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (true);

-- Edge functions can update orders
CREATE POLICY "Edge functions can update orders" 
ON public.orders 
FOR UPDATE 
USING (true);

-- Add trigger for updated_at
CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster lookups
CREATE INDEX idx_orders_customer_email ON public.orders(customer_email);
CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_shopify_order_id ON public.orders(shopify_order_id);