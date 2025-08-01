import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CalendarDays, User, Share2, ArrowLeft, ArrowRight, Eye } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: string;
  featured: boolean;
  published_at: string | null;
  created_at: string;
  view_count: number;
  meta_description: string | null;
  meta_keywords: string[] | null;
  blog_categories?: {
    name: string;
    slug: string;
  };
  blog_authors?: {
    name: string;
    bio?: string;
  };
  blog_post_tags?: {
    blog_tags: {
      name: string;
      slug: string;
    };
  }[];
}

const BlogPostDynamic = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchBlogPost(slug);
    }
  }, [slug]);

  const fetchBlogPost = async (postSlug: string) => {
    try {
      // Fetch the main post
      const { data: postData, error: postError } = await supabase
        .from('blog_posts')
        .select(`
          *,
          blog_categories!inner(name, slug),
          blog_authors!inner(name, bio),
          blog_post_tags(
            blog_tags(name, slug)
          )
        `)
        .eq('slug', postSlug)
        .eq('status', 'published')
        .single();

      if (postError) throw postError;

      setPost(postData);

      // Increment view count
      await supabase
        .from('blog_posts')
        .update({ view_count: (postData.view_count || 0) + 1 })
        .eq('id', postData.id);

      // Fetch related posts from the same category
      if (postData.blog_categories) {
        const { data: relatedData, error: relatedError } = await supabase
          .from('blog_posts')
          .select(`
            *,
            blog_categories!inner(name, slug),
            blog_authors!inner(name)
          `)
          .eq('blog_categories.name', postData.blog_categories.name)
          .eq('status', 'published')
          .neq('id', postData.id)
          .limit(3)
          .order('published_at', { ascending: false });

        if (!relatedError) {
          setRelatedPosts(relatedData || []);
        }
      }
    } catch (error) {
      console.error('Error fetching blog post:', error);
      toast({
        title: "Error",
        description: "Blog post not found",
        variant: "destructive"
      });
      navigate("/blog");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    const title = post?.title || "Air Care Blog Post";

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
        toast({
          title: "Shared successfully!",
          description: "The blog post has been shared.",
        });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Error sharing:', error);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        toast({
          title: "Link copied!",
          description: "The blog post URL has been copied to your clipboard.",
        });
      } catch (error) {
        console.error('Error copying to clipboard:', error);
        toast({
          title: "Error",
          description: "Could not copy link to clipboard.",
          variant: "destructive"
        });
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate("/blog")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <article className="py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate("/blog")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">
                {post.blog_categories?.name || 'Uncategorized'}
              </Badge>
              {post.featured && <Badge variant="outline">Featured</Badge>}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                {post.excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.blog_authors?.name || 'Unknown Author'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                <span>{formatDate(post.published_at || post.created_at)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{post.view_count} views</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button onClick={handleShare} variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            {post.content.split('\n').map((paragraph, index) => (
              paragraph.trim() && (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              )
            ))}
          </div>

          {/* Tags */}
          {post.blog_post_tags && post.blog_post_tags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.blog_post_tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag.blog_tags.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          {post.blog_authors?.bio && (
            <Card className="mb-12">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">About the Author</h3>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary-glow/20 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">{post.blog_authors.name}</h4>
                    <p className="text-muted-foreground">{post.blog_authors.bio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl font-bold mb-8 text-center">Related Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="h-32 bg-gradient-to-br from-muted to-muted-foreground/10 flex items-center justify-center">
                      <div className="w-12 h-12 text-muted-foreground/40" />
                    </div>
                    <div className="p-4">
                      <Badge variant="outline" className="text-xs mb-2">
                        {relatedPost.blog_categories?.name || 'Uncategorized'}
                      </Badge>
                      <h3 className="font-semibold mb-2 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <Link
                        to={`/blog/${relatedPost.slug}`}
                        className="inline-flex items-center gap-1 text-primary hover:text-primary-glow font-medium text-sm"
                      >
                        Read More
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Discover More Articles</h2>
          <p className="text-muted-foreground mb-6">
            Explore our comprehensive library of air care guides and expert insights
          </p>
          <Button onClick={() => navigate("/blog")} size="lg">
            View All Articles
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPostDynamic;