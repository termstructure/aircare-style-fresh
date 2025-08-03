-- Enable pg_cron extension for automated publishing
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Create a cron job that runs every 15 minutes to publish scheduled posts
SELECT cron.schedule(
  'auto-publish-blog-posts',
  '*/15 * * * *', -- Every 15 minutes
  $$
  SELECT publish_scheduled_posts();
  $$
);