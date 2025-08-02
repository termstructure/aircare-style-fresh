-- Add unique constraints for slug columns to support upserts
ALTER TABLE public.blog_categories ADD CONSTRAINT blog_categories_slug_unique UNIQUE (slug);
ALTER TABLE public.blog_posts ADD CONSTRAINT blog_posts_slug_unique UNIQUE (slug);
ALTER TABLE public.blog_tags ADD CONSTRAINT blog_tags_slug_unique UNIQUE (slug);