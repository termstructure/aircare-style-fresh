import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useBlogAI } from "@/hooks/useBlogAI";
import { Plus, Edit, Trash2, Eye, Save, X, Database, Sparkles, Wand2, Clock, Tag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SchedulingModal } from "@/components/ui/scheduling-modal";
import { TagSelector } from "@/components/ui/tag-selector";
import { ImageUpload } from "@/components/ui/image-upload";

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
  author_id: string;
  category_id: string | null;
  featured_image_url: string | null;
  meta_description: string | null;
  meta_keywords: string[] | null;
  scheduled_for: string | null;
  updated_at: string;
  view_count: number;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Author {
  id: string;
  name: string;
}

const BlogAdmin = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [newPost, setNewPost] = useState({
    title: "",
    excerpt: "",
    content: "",
    category_id: "",
    featured: false,
    featured_image_url: ""
  });
  const [showEditor, setShowEditor] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [generationData, setGenerationData] = useState({
    topic: "",
    tone: "informative",
    category: "",
    featured_image_url: ""
  });
  const [showSchedulingModal, setShowSchedulingModal] = useState(false);
  const [schedulingPost, setSchedulingPost] = useState<BlogPost | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [generatedContentTags, setGeneratedContentTags] = useState<string[]>([]);
  const [editingPostTags, setEditingPostTags] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { usageStats, getUsageStats, migrateStaticData, generateContent, autoPublishScheduled, loading: aiLoading } = useBlogAI();

  useEffect(() => {
    checkAuth();
    fetchData();
    getUsageStats();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }
  };

  const fetchData = async () => {
    try {
      const [postsResult, categoriesResult, authorsResult] = await Promise.all([
        supabase.from('blog_posts').select('*').order('created_at', { ascending: false }),
        supabase.from('blog_categories').select('*').order('name'),
        supabase.from('blog_authors').select('*').order('name')
      ]);

      if (postsResult.error) throw postsResult.error;
      if (categoriesResult.error) throw categoriesResult.error;
      if (authorsResult.error) throw authorsResult.error;

      setPosts(postsResult.data || []);
      setCategories(categoriesResult.data || []);
      setAuthors(authorsResult.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load blog data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const createPost = async (publish = false) => {
    if (!newPost.title || !newPost.content) {
      toast({
        title: "Error",
        description: "Title and content are required",
        variant: "destructive"
      });
      return;
    }

    try {
      const slug = generateSlug(newPost.title);
      
      // Get or create default author
      let authorId = authors[0]?.id;
      if (!authorId) {
        const { data: { session } } = await supabase.auth.getSession();
        const { data: authorData, error: authorError } = await supabase
          .from('blog_authors')
          .insert({
            name: session?.user?.email?.split('@')[0] || 'Admin',
            bio: 'Blog Administrator'
          })
          .select()
          .single();

        if (authorError) throw authorError;
        authorId = authorData.id;
      }

      const postData: any = {
        title: newPost.title,
        slug,
        excerpt: newPost.excerpt,
        content: newPost.content,
        category_id: newPost.category_id || null,
        author_id: authorId,
        featured: newPost.featured,
        featured_image_url: newPost.featured_image_url || null,
        status: publish ? 'published' : 'draft'
      };

      if (publish) {
        postData.published_at = new Date().toISOString();
      }

      const { data: savedPost, error } = await supabase.from('blog_posts').insert(postData).select().single();

      if (error) throw error;

      // Save tag associations
      if (selectedTags.length > 0 && savedPost) {
        const tagAssociations = selectedTags.map(tagId => ({
          post_id: savedPost.id,
          tag_id: tagId
        }));
        
        const { error: tagError } = await supabase
          .from('blog_post_tags')
          .insert(tagAssociations);
        
        if (tagError) throw tagError;
      }

      toast({
        title: "Success",
        description: publish ? "Blog post published successfully" : "Blog post created successfully"
      });

      setNewPost({ title: "", excerpt: "", content: "", category_id: "", featured: false, featured_image_url: "" });
      setSelectedTags([]);
      setShowEditor(false);
      fetchData();
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error",
        description: "Failed to create blog post",
        variant: "destructive"
      });
    }
  };

  const fetchPostTags = async (postId: string) => {
    try {
      const { data, error } = await supabase
        .from('blog_post_tags')
        .select('tag_id')
        .eq('post_id', postId);
      
      if (error) throw error;
      
      return data?.map(item => item.tag_id) || [];
    } catch (error) {
      console.error('Error fetching post tags:', error);
      return [];
    }
  };

  const startEditingPost = async (post: BlogPost) => {
    setEditingPost(post);
    const tags = await fetchPostTags(post.id);
    setEditingPostTags(tags);
  };

  const updatePost = async (post: BlogPost) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          featured: post.featured,
          featured_image_url: post.featured_image_url
        })
        .eq('id', post.id);

      if (error) throw error;

      // Update tag associations
      // First, delete existing tag associations
      const { error: deleteError } = await supabase
        .from('blog_post_tags')
        .delete()
        .eq('post_id', post.id);

      if (deleteError) throw deleteError;

      // Then, insert new tag associations
      if (editingPostTags.length > 0) {
        const tagAssociations = editingPostTags.map(tagId => ({
          post_id: post.id,
          tag_id: tagId
        }));
        
        const { error: tagError } = await supabase
          .from('blog_post_tags')
          .insert(tagAssociations);
        
        if (tagError) throw tagError;
      }

      toast({
        title: "Success",
        description: "Blog post updated successfully"
      });

      setEditingPost(null);
      setEditingPostTags([]);
      fetchData();
    } catch (error) {
      console.error('Error updating post:', error);
      toast({
        title: "Error",
        description: "Failed to update blog post",
        variant: "destructive"
      });
    }
  };

  const publishPost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({
          status: 'published',
          published_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post published successfully"
      });

      fetchData();
    } catch (error) {
      console.error('Error publishing post:', error);
      toast({
        title: "Error",
        description: "Failed to publish blog post",
        variant: "destructive"
      });
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post deleted successfully"
      });

      fetchData();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive"
      });
    }
  };

  const handleGenerateContent = async () => {
    if (!generationData.topic.trim()) {
      toast({
        title: "Error",
        description: "Please enter a topic",
        variant: "destructive"
      });
      return;
    }

    try {
      const result = await generateContent(
        generationData.topic,
        'blog_post',
        generationData.tone,
        false, // Don't save to DB immediately, let user preview first
        generationData.category
      );
      setGeneratedContent(result.content);
    } catch (error) {
      console.error('Error generating content:', error);
    }
  };

  const handleSaveGeneratedContent = async (scheduledDate?: Date, publish = false) => {
    if (!generatedContent) return;

    try {
      const slug = generateSlug(generatedContent.title);
      
      // Get or create default author
      let authorId = authors[0]?.id;
      if (!authorId) {
        const { data: { session } } = await supabase.auth.getSession();
        const { data: authorData, error: authorError } = await supabase
          .from('blog_authors')
          .insert({
            name: session?.user?.email?.split('@')[0] || 'Admin',
            bio: 'Blog Administrator'
          })
          .select()
          .single();

        if (authorError) throw authorError;
        authorId = authorData.id;
      }

      const postData: any = {
        title: generatedContent.title,
        slug,
        excerpt: generatedContent.excerpt,
        content: generatedContent.content,
        meta_description: generatedContent.meta_description,
        meta_keywords: generatedContent.meta_keywords,
        category_id: generationData.category || categories[0]?.id || null,
        author_id: authorId,
        featured_image_url: generationData.featured_image_url || null,
        status: publish ? 'published' : (scheduledDate ? 'scheduled' : 'draft')
      };

      if (publish) {
        postData.published_at = new Date().toISOString();
      } else if (scheduledDate) {
        postData.scheduled_for = scheduledDate.toISOString();
      }

      const { data: savedPost, error } = await supabase.from('blog_posts').insert(postData).select().single();

      if (error) throw error;

      // Save tag associations for generated content
      if (generatedContentTags.length > 0 && savedPost) {
        const tagAssociations = generatedContentTags.map(tagId => ({
          post_id: savedPost.id,
          tag_id: tagId
        }));
        
        const { error: tagError } = await supabase
          .from('blog_post_tags')
          .insert(tagAssociations);
        
        if (tagError) throw tagError;
      }

      toast({
        title: "Success",
        description: publish 
          ? "Generated content published successfully" 
          : (scheduledDate 
            ? `Blog post scheduled for publication` 
            : "Generated content saved as draft")
      });

      setGeneratedContent(null);
      setShowGenerator(false);
      setShowSchedulingModal(false);
      setGeneratedContentTags([]);
      setGenerationData({ topic: "", tone: "informative", category: "", featured_image_url: "" });
      fetchData();
    } catch (error) {
      console.error('Error saving generated content:', error);
      toast({
        title: "Error",
        description: "Failed to save generated content",
        variant: "destructive"
      });
    }
  };

  const schedulePost = async (post: BlogPost, scheduledDate: Date) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({
          status: 'scheduled',
          scheduled_for: scheduledDate.toISOString()
        })
        .eq('id', post.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post scheduled successfully"
      });

      setSchedulingPost(null);
      setShowSchedulingModal(false);
      fetchData();
    } catch (error) {
      console.error('Error scheduling post:', error);
      toast({
        title: "Error",
        description: "Failed to schedule blog post",
        variant: "destructive"
      });
    }
  };

  const handleAutoPublish = async () => {
    try {
      await autoPublishScheduled();
      fetchData(); // Refresh the posts list
    } catch (error) {
      console.error('Error auto-publishing:', error);
    }
  };

  const isOverdue = (post: BlogPost) => {
    return post.status === 'scheduled' && 
           post.scheduled_for && 
           new Date(post.scheduled_for) < new Date();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto py-fluid-md">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto py-fluid-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Blog Admin</h1>
          <div className="flex gap-2">
            <Button onClick={migrateStaticData} disabled={aiLoading} variant="outline">
              <Database className="w-4 h-4 mr-2" />
              Migrate Data
            </Button>
            <Button onClick={() => setShowGenerator(true)} disabled={aiLoading} variant="outline">
              <Sparkles className="w-4 h-4 mr-2" />
              Generate with AI
            </Button>
            <Button onClick={handleAutoPublish} disabled={aiLoading} variant="outline">
              <Clock className="w-4 h-4 mr-2" />
              Publish Scheduled
            </Button>
            <Button onClick={() => setShowEditor(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </div>
        </div>

        {usageStats && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>AI Usage Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    ${usageStats.currentMonthlyCost.toFixed(4)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Used of ${usageStats.monthlyBudget}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    ${usageStats.remainingBudget.toFixed(4)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Remaining Budget
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {usageStats.todayRequestCount}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Requests Today
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {usageStats.remainingDailyRequests}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Remaining Today
                  </div>
                </div>
              </div>
              {usageStats.remainingBudget < 2 && (
                <div className="mt-4 p-3 bg-destructive/10 text-destructive rounded-lg">
                  ⚠️ Warning: Low budget remaining! Consider upgrading your monthly limit.
                </div>
              )}
              {usageStats.remainingDailyRequests <= 2 && (
                <div className="mt-4 p-3 bg-orange-100 text-orange-800 rounded-lg">
                  ⚠️ Warning: Only {usageStats.remainingDailyRequests} daily requests remaining.
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {showEditor && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Create New Post</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Post title"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              />
              <Textarea
                placeholder="Post excerpt"
                value={newPost.excerpt}
                onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                rows={3}
              />
              <Textarea
                placeholder="Post content"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                rows={10}
              />
              <div className="space-y-2">
                <label className="text-sm font-medium">Featured Image</label>
                <ImageUpload
                  onImageUpload={(url) => setNewPost({ ...newPost, featured_image_url: url })}
                  currentImage={newPost.featured_image_url}
                  onImageRemove={() => setNewPost({ ...newPost, featured_image_url: "" })}
                />
              </div>
              <TagSelector
                selectedTags={selectedTags}
                onTagsChange={setSelectedTags}
                className="mt-4"
              />
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newPost.featured}
                    onChange={(e) => setNewPost({ ...newPost, featured: e.target.checked })}
                  />
                  Featured
                </label>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => createPost(false)}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </Button>
                <Button onClick={() => createPost(true)}>
                  <Eye className="w-4 h-4 mr-2" />
                  Publish Now
                </Button>
                <Button variant="outline" onClick={() => setShowEditor(false)}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {showGenerator && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Generate Content with AI</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Enter topic (e.g., 'How to choose the right HEPA filter')"
                value={generationData.topic}
                onChange={(e) => setGenerationData({ ...generationData, topic: e.target.value })}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  value={generationData.category}
                  onValueChange={(value) => setGenerationData({ ...generationData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={generationData.tone}
                  onValueChange={(value) => setGenerationData({ ...generationData, tone: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="informative">Informative</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                  </SelectContent>
                 </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Featured Image</label>
                  <ImageUpload
                    onImageUpload={(url) => setGenerationData({ ...generationData, featured_image_url: url })}
                    currentImage={generationData.featured_image_url}
                    onImageRemove={() => setGenerationData({ ...generationData, featured_image_url: "" })}
                  />
                </div>
                
                <TagSelector
                  selectedTags={generatedContentTags}
                  onTagsChange={setGeneratedContentTags}
                  className="mt-4"
                />
               
               {generatedContent && (
                <div className="border rounded-lg p-4 bg-muted/50">
                  <h4 className="font-semibold mb-2">Generated Content Preview:</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Title:</strong> {generatedContent.title}</p>
                    <p><strong>Excerpt:</strong> {generatedContent.excerpt}</p>
                    <p><strong>Meta Description:</strong> {generatedContent.meta_description}</p>
                    <div className="max-h-32 overflow-y-auto">
                      <p><strong>Content:</strong> {generatedContent.content.substring(0, 200)}...</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                {!generatedContent ? (
                  <Button onClick={handleGenerateContent} disabled={aiLoading}>
                    <Wand2 className="w-4 h-4 mr-2" />
                    {aiLoading ? "Generating..." : "Generate Content"}
                  </Button>
                ) : (
                  <>
                    <Button onClick={() => handleSaveGeneratedContent(undefined, false)}>
                      <Save className="w-4 h-4 mr-2" />
                      Save as Draft
                    </Button>
                    <Button onClick={() => handleSaveGeneratedContent(undefined, true)}>
                      <Eye className="w-4 h-4 mr-2" />
                      Publish Now
                    </Button>
                    <Button onClick={() => setShowSchedulingModal(true)}>
                      <Clock className="w-4 h-4 mr-2" />
                      Schedule Publication
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setGeneratedContent(null)}
                    >
                      Generate New
                    </Button>
                  </>
                )}
                <Button variant="outline" onClick={() => {
                  setShowGenerator(false);
                  setGeneratedContent(null);
                  setGeneratedContentTags([]);
                  setGenerationData({ topic: "", tone: "informative", category: "", featured_image_url: "" });
                }}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardContent className="p-6">
                {editingPost?.id === post.id ? (
                  <div className="space-y-4">
                    <Input
                      value={editingPost.title}
                      onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                    />
                    <Textarea
                      value={editingPost.excerpt}
                      onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                      rows={3}
                    />
                    <Textarea
                      value={editingPost.content}
                      onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                      rows={10}
                    />
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Featured Image</label>
                      <ImageUpload
                        onImageUpload={(url) => setEditingPost({ ...editingPost, featured_image_url: url })}
                        currentImage={editingPost.featured_image_url}
                        onImageRemove={() => setEditingPost({ ...editingPost, featured_image_url: null })}
                      />
                    </div>
                     <TagSelector
                       selectedTags={editingPostTags}
                       onTagsChange={setEditingPostTags}
                       className="mt-4"
                     />
                     <div className="flex items-center gap-4">
                       <label className="flex items-center gap-2">
                         <input
                           type="checkbox"
                           checked={editingPost.featured}
                           onChange={(e) => setEditingPost({ ...editingPost, featured: e.target.checked })}
                         />
                         Featured
                       </label>
                     </div>
                    <div className="flex gap-2">
                      <Button onClick={() => updatePost(editingPost)}>
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" onClick={() => setEditingPost(null)}>
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                     <div className="flex justify-between items-start mb-2">
                       <h3 className="text-xl font-semibold">{post.title}</h3>
                       <div className="flex gap-2">
                         <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                           {post.status}
                         </Badge>
                         {post.featured && <Badge variant="outline">Featured</Badge>}
                         {isOverdue(post) && <Badge variant="destructive">OVERDUE</Badge>}
                       </div>
                     </div>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => startEditingPost(post)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      {post.status === 'draft' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => publishPost(post.id)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Publish
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSchedulingPost(post);
                              setShowSchedulingModal(true);
                            }}
                          >
                            <Clock className="w-4 h-4 mr-2" />
                            Schedule
                          </Button>
                        </>
                      )}
                       {post.status === 'scheduled' && post.scheduled_for && (
                         <>
                           <div className={`text-sm flex items-center gap-2 ${isOverdue(post) ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>
                             {isOverdue(post) ? '⚠️ OVERDUE - Was scheduled for: ' : 'Scheduled for: '}
                             {new Date(post.scheduled_for).toLocaleString('en-US', {
                               year: 'numeric',
                               month: 'long', 
                               day: 'numeric',
                               hour: 'numeric',
                               minute: '2-digit',
                               timeZoneName: 'short'
                             })}
                           </div>
                           {isOverdue(post) && (
                             <Button
                               size="sm"
                               onClick={() => publishPost(post.id)}
                               className="bg-destructive hover:bg-destructive/90"
                             >
                               <Eye className="w-4 h-4 mr-2" />
                               Publish Now
                             </Button>
                           )}
                           <Button
                             size="sm"
                             variant="outline"
                             onClick={() => {
                               setSchedulingPost(post);
                               setShowSchedulingModal(true);
                             }}
                           >
                             <Clock className="w-4 h-4 mr-2" />
                             Reschedule
                           </Button>
                         </>
                       )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate(`/blog/${post.slug}`)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deletePost(post.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
      
      <SchedulingModal
        open={showSchedulingModal}
        onOpenChange={setShowSchedulingModal}
        onSchedule={(date) => {
          if (schedulingPost) {
            schedulePost(schedulingPost, date);
          } else if (generatedContent) {
            handleSaveGeneratedContent(date);
          }
        }}
        onSaveAsDraft={() => {
          if (generatedContent) {
            handleSaveGeneratedContent();
          }
          setShowSchedulingModal(false);
        }}
        loading={aiLoading}
        title={schedulingPost ? "Schedule Post" : "Schedule Generated Content"}
        initialDate={schedulingPost?.scheduled_for ? new Date(schedulingPost.scheduled_for) : undefined}
      />
    </div>
  );
};

export default BlogAdmin;