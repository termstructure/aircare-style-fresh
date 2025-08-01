import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useBlogAI = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const migrateStaticData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('blog-ai-assistant', {
        body: { action: 'migrate_static_data' }
      });

      if (error) throw error;

      toast({
        title: "Migration Successful",
        description: `Migrated ${data.migrated_posts} blog posts successfully`
      });

      return data;
    } catch (error) {
      console.error('Migration error:', error);
      toast({
        title: "Migration Failed",
        description: "Failed to migrate blog data. Please try again.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const generateContent = async (topic: string, type = 'blog_post', tone = 'informative') => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('blog-ai-assistant', {
        body: { 
          action: 'generate_content',
          data: { topic, type, tone }
        }
      });

      if (error) throw error;

      toast({
        title: "Content Generated",
        description: "AI content has been generated successfully"
      });

      return data.content;
    } catch (error) {
      console.error('Content generation error:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate content. Please try again.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const autoPublishScheduled = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('blog-ai-assistant', {
        body: { action: 'auto_publish' }
      });

      if (error) throw error;

      toast({
        title: "Auto-Publish Complete",
        description: `Published ${data.published_count} scheduled posts`
      });

      return data;
    } catch (error) {
      console.error('Auto-publish error:', error);
      toast({
        title: "Auto-Publish Failed",
        description: "Failed to publish scheduled posts.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    migrateStaticData,
    generateContent,
    autoPublishScheduled
  };
};