-- Fix security warnings by setting proper search paths for functions

-- Update generate_slug function with security definer and search path
CREATE OR REPLACE FUNCTION public.generate_slug(title TEXT)
RETURNS TEXT 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  RETURN lower(regexp_replace(regexp_replace(trim(title), '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'));
END;
$$;

-- Update publish_scheduled_posts function with proper search path
CREATE OR REPLACE FUNCTION public.publish_scheduled_posts()
RETURNS void 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  UPDATE public.blog_posts 
  SET status = 'published', published_at = now()
  WHERE status = 'scheduled' AND scheduled_for <= now();
END;
$$;