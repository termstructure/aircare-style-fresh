-- Insert 9 new generic blog categories (Education already exists)
INSERT INTO public.blog_categories (name, slug, description) VALUES
('Health & Wellness', 'health-wellness', 'Content about health benefits, wellness tips, lifestyle improvements'),
('Home & Living', 'home-living', 'Home improvement, household tips, living space optimization'),
('Technology', 'technology', 'Tech-related content, innovations, how technology works'),
('Seasonal', 'seasonal', 'Seasonal tips, seasonal problems and solutions, time-based content'),
('How-To', 'how-to', 'Step-by-step guides, instructional content, DIY approaches'),
('Product Reviews', 'product-reviews', 'Product comparisons, reviews, buying guides'),
('Tips & Tricks', 'tips-tricks', 'Quick tips, pro advice, shortcuts, best practices'),
('Industry Insights', 'industry-insights', 'Industry news, trends, professional insights'),
('FAQ & Troubleshooting', 'faq-troubleshooting', 'Common questions, problem-solving, troubleshooting guides')
ON CONFLICT (slug) DO NOTHING;