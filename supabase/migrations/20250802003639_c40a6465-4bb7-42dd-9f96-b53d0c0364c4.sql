-- Add unique constraint for blog_authors name column
ALTER TABLE public.blog_authors ADD CONSTRAINT blog_authors_name_unique UNIQUE (name);