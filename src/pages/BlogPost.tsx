import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CalendarDays, User, Clock, Tag, Share2, BookOpen, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

// Complete blog posts data with content for all posts
const blogPosts = [
  {
    id: 1,
    slug: "complete-guide-merv-ratings",
    title: "The Complete Guide to MERV Ratings: Choosing the Right Filter for Your Home",
    excerpt: "Understanding MERV ratings is crucial for selecting the right air filter. Learn how different ratings affect air quality, energy efficiency, and system performance.",
    content: `
      <h2>What Are MERV Ratings?</h2>
      <p>MERV stands for Minimum Efficiency Reporting Value, and it's the industry standard for measuring how effectively an air filter captures particles. The scale ranges from 1 to 20, with higher numbers indicating better filtration capabilities.</p>
      
      <h3>Understanding the MERV Scale</h3>
      <ul>
        <li><strong>MERV 1-4:</strong> Basic filtration that captures large particles like dust and pollen</li>
        <li><strong>MERV 5-8:</strong> Good filtration for residential use, capturing mold spores and pet dander</li>
        <li><strong>MERV 9-12:</strong> Superior filtration that catches fine dust and some bacteria</li>
        <li><strong>MERV 13-16:</strong> Excellent filtration used in hospitals, capturing smoke and bacteria</li>
        <li><strong>MERV 17-20:</strong> HEPA-level filtration used in cleanrooms and specialized applications</li>
      </ul>
      
      <h3>Choosing the Right MERV Rating</h3>
      <p>For most homes, MERV 8-13 provides the best balance of air quality improvement and energy efficiency. Higher MERV ratings can restrict airflow in residential HVAC systems, potentially causing damage or increased energy costs.</p>
      
      <h3>Factors to Consider</h3>
      <ul>
        <li>Your HVAC system's capabilities</li>
        <li>Presence of allergies or respiratory conditions</li>
        <li>Local air quality and pollution levels</li>
        <li>Pets in the home</li>
        <li>Energy efficiency concerns</li>
      </ul>
      
      <p>Remember, the highest MERV rating isn't always the best choice. It's about finding the right balance for your specific needs and system requirements.</p>
    `,
    author: "Sarah Johnson",
    date: "2024-01-15",
    category: "Education",
    readTime: "8 min read",
    featured: true,
    tags: ["MERV", "Air Quality", "Home Improvement", "Filters"]
  },
  {
    id: 2,
    slug: "signs-change-air-filter",
    title: "5 Signs It's Time to Change Your Air Filter (And What Happens If You Don't)",
    excerpt: "Recognizing when to change your air filter can save you money and improve your health. Here are the key warning signs you shouldn't ignore.",
    content: `
      <h2>Why Regular Filter Changes Matter</h2>
      <p>Your air filter is your HVAC system's first line of defense against dust, pollen, and other airborne particles. When it becomes clogged, it can't do its job effectively, leading to poor air quality and system problems.</p>
      
      <h3>5 Clear Signs It's Time for a New Filter</h3>
      
      <h4>1. Visible Dirt and Debris</h4>
      <p>If you can see dirt, dust, or debris on your filter, it's definitely time for a change. A clean filter should appear white or off-white, not gray or brown.</p>
      
      <h4>2. Increased Energy Bills</h4>
      <p>A clogged filter forces your HVAC system to work harder, consuming more energy. If you notice unexplained increases in your utility bills, check your filter.</p>
      
      <h4>3. Poor Air Quality</h4>
      <p>More dust around your home, worsening allergies, or stale air can all indicate a filter that's no longer effective.</p>
      
      <h4>4. HVAC System Running Constantly</h4>
      <p>When your system struggles to maintain temperature due to restricted airflow, it will run more frequently and for longer periods.</p>
      
      <h4>5. Strange Odors</h4>
      <p>Musty or stale odors coming from your vents often indicate a filter that's beyond its useful life.</p>
      
      <h3>The Consequences of Neglecting Filter Changes</h3>
      <ul>
        <li>Reduced HVAC system lifespan</li>
        <li>Higher energy costs</li>
        <li>Poor indoor air quality</li>
        <li>Potential system breakdowns</li>
        <li>Voided warranty coverage</li>
      </ul>
      
      <h3>How Often Should You Change Your Filter?</h3>
      <p>Generally, standard 1-inch filters should be changed every 1-3 months, depending on usage, pets, and local air quality. Thicker filters may last 6-12 months.</p>
    `,
    author: "Mike Chen",
    date: "2024-01-12",
    category: "Maintenance",
    readTime: "6 min read",
    featured: false,
    tags: ["Maintenance", "HVAC", "Energy Efficiency", "Health"]
  },
  {
    id: 3,
    slug: "hepa-vs-standard-filters",
    title: "HEPA vs. Standard Filters: Which One Do You Really Need?",
    excerpt: "HEPA filters promise superior air cleaning, but are they right for your HVAC system? We break down the pros, cons, and costs.",
    content: `
      <h2>Understanding HEPA Technology</h2>
      <p>HEPA (High-Efficiency Particulate Air) filters are designed to capture 99.97% of particles that are 0.3 microns or larger. This makes them incredibly effective at removing tiny particles from the air.</p>
      
      <h3>HEPA Filter Benefits</h3>
      <ul>
        <li>Superior particle capture (down to 0.3 microns)</li>
        <li>Excellent for allergy and asthma sufferers</li>
        <li>Removes bacteria and some viruses</li>
        <li>Long-lasting performance</li>
      </ul>
      
      <h3>HEPA Filter Drawbacks</h3>
      <ul>
        <li>Higher upfront cost</li>
        <li>May restrict airflow in standard HVAC systems</li>
        <li>Requires system modifications in some cases</li>
        <li>Not suitable for all HVAC systems</li>
      </ul>
      
      <h3>Standard Filters: The Practical Choice</h3>
      <p>Standard pleated filters with MERV ratings of 8-13 offer excellent performance for most homes. They provide good filtration while maintaining proper airflow for your HVAC system.</p>
      
      <h4>When Standard Filters Are Sufficient:</h4>
      <ul>
        <li>General household dust and pollen control</li>
        <li>Typical residential HVAC systems</li>
        <li>Budget-conscious consumers</li>
        <li>Homes without severe allergy issues</li>
      </ul>
      
      <h3>When to Consider HEPA</h3>
      <ul>
        <li>Severe allergies or asthma</li>
        <li>Compromised immune systems</li>
        <li>High pollution areas</li>
        <li>HVAC system designed for high-efficiency filters</li>
      </ul>
      
      <h3>Making the Right Choice</h3>
      <p>For most homeowners, a high-quality MERV 11-13 filter provides the best balance of air cleaning and system compatibility. Consult with an HVAC professional before upgrading to HEPA filtration.</p>
    `,
    author: "Dr. Emily Rodriguez",
    date: "2024-01-10",
    category: "Product Guide",
    readTime: "10 min read",
    featured: true,
    tags: ["HEPA", "Product Comparison", "Air Quality", "Health"]
  }
  // Add more blog posts with default content for those without specific content
];

// Generate default content for posts that don't have specific content
const generateDefaultContent = (post: any) => {
  return `
    <h2>Introduction</h2>
    <p>${post.excerpt}</p>
    
    <h3>Key Points to Consider</h3>
    <p>When it comes to ${post.category.toLowerCase()}, understanding the fundamentals is crucial for making informed decisions about your indoor air quality needs.</p>
    
    <h3>Best Practices</h3>
    <ul>
      <li>Regular maintenance and monitoring</li>
      <li>Choosing quality products from reputable manufacturers</li>
      <li>Following manufacturer guidelines and recommendations</li>
      <li>Consulting with HVAC professionals when needed</li>
    </ul>
    
    <h3>Common Mistakes to Avoid</h3>
    <p>Many homeowners make costly mistakes that could be easily avoided with proper knowledge and planning. Here are some key points to keep in mind.</p>
    
    <h3>Conclusion</h3>
    <p>By following these guidelines and staying informed about the latest developments in air filtration technology, you can maintain excellent indoor air quality while protecting your HVAC investment.</p>
  `;
};

// Import the blog posts from Blog.tsx component to ensure consistency
const getAllBlogPosts = () => {
  // This would ideally be imported from a shared data file
  // For now, we'll create a comprehensive list
  const allBlogPosts = [
    ...blogPosts,
    {
      id: 4,
      slug: "spring-allergy-filter-strategy",
      title: "Seasonal Air Filter Strategies: Optimizing for Spring Allergies",
      excerpt: "Spring brings beautiful weather but also increased pollen. Learn how to adjust your air filtration strategy for allergy season.",
      content: "",
      author: "Sarah Johnson",
      date: "2024-01-08",
      category: "Seasonal Tips",
      readTime: "7 min read",
      featured: false,
      tags: ["Allergies", "Seasonal", "Pollen", "Health"]
    },
    {
      id: 5,
      slug: "hidden-costs-cheap-filters",
      title: "The Hidden Costs of Cheap Air Filters: A Long-Term Analysis",
      excerpt: "Budget filters might seem economical, but they could be costing you more in the long run. We analyze the true cost of air filtration.",
      content: "",
      author: "David Park",
      date: "2024-01-05",
      category: "Cost Analysis",
      readTime: "12 min read",
      featured: false,
      tags: ["Cost Analysis", "Budget", "Long-term", "Investment"]
    },
    {
      id: 6,
      slug: "pet-owners-filter-guide",
      title: "Indoor Air Quality and Pet Owners: Essential Filter Selection Guide",
      excerpt: "Pet dander, hair, and odors require special filtration considerations. Here's how to keep your air clean with furry family members.",
      content: "",
      author: "Dr. Emily Rodriguez",
      date: "2024-01-03",
      category: "Pet Owners",
      readTime: "9 min read",
      featured: false,
      tags: ["Pet Owners", "Dander", "Allergies", "Air Quality"]
    },
    {
      id: 7,
      slug: "commercial-vs-residential-filters",
      title: "Commercial vs. Residential Air Filters: Understanding the Differences",
      excerpt: "Commercial and residential air filters serve different needs. Learn which specifications matter for your specific application.",
      content: "",
      author: "Mike Chen",
      date: "2023-12-28",
      category: "Commercial",
      readTime: "11 min read",
      featured: false,
      tags: ["Commercial", "Residential", "Comparison", "Applications"]
    },
    {
      id: 8,
      slug: "diy-filter-installation-guide",
      title: "DIY Filter Installation: Step-by-Step Guide with Common Mistakes to Avoid",
      excerpt: "Installing air filters seems simple, but small mistakes can reduce effectiveness. Follow our guide for perfect installation every time.",
      content: "",
      author: "Sarah Johnson",
      date: "2023-12-25",
      category: "DIY Guide",
      readTime: "5 min read",
      featured: false,
      tags: ["DIY", "Installation", "Tutorial", "Maintenance"]
    }
    // Add more posts as needed...
  ];

  return allBlogPosts.map(post => ({
    ...post,
    content: post.content || generateDefaultContent(post),
    tags: post.tags || [post.category, "Air Quality", "Filters"]
  }));
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const allPosts = getAllBlogPosts();
  const post = allPosts.find(p => p.slug === slug);
  const relatedPosts = allPosts.filter(p => p.slug !== slug && p.category === post?.category).slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Blog post link copied to clipboard!",
      });
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/blog">Back to Blog</Link>
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
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <span className="text-muted-foreground">/</span>
          <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">
            Blog
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm text-foreground">{post.category}</span>
        </div>

        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline">{post.category}</Badge>
              <div className="flex items-center text-sm text-muted-foreground gap-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
                <div className="flex items-center gap-1">
                  <CalendarDays className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString()}
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              {post.excerpt}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">{post.author}</span>
              </div>
              
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </header>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none mb-8 text-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="flex items-center gap-2 mb-8 pb-8 border-b">
            <Tag className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Tags:</span>
            <div className="flex flex-wrap gap-2">
              {post.tags?.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Author Bio */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{post.author}</h3>
                  <p className="text-muted-foreground text-sm">
                    {post.author === "Dr. Emily Rodriguez" 
                      ? "Dr. Rodriguez is a certified indoor air quality specialist with over 15 years of experience in HVAC systems and environmental health."
                      : post.author === "Mike Chen"
                      ? "Mike is a licensed HVAC technician and industry expert who has been helping homeowners optimize their air quality for over a decade."
                      : post.author === "Sarah Johnson"
                      ? "Sarah is a home improvement writer and air quality advocate who specializes in making complex HVAC topics accessible to homeowners."
                      : "David is a cost analysis expert specializing in HVAC investments and long-term home maintenance strategies."
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="group hover:shadow-card transition-all duration-300">
                    <Link to={`/blog/${relatedPost.slug}`}>
                      <CardContent className="p-4">
                        <Badge variant="outline" className="text-xs mb-2">
                          {relatedPost.category}
                        </Badge>
                        <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{relatedPost.author}</span>
                          <span>•</span>
                          <span>{relatedPost.readTime}</span>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Want to Read More?</h3>
              <p className="text-muted-foreground mb-4">
                Explore our complete library of air quality guides and maintenance tips.
              </p>
              <Button asChild>
                <Link to="/blog">
                  View All Articles
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </article>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPost;