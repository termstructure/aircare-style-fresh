import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CalendarDays, User, Clock, Tag, Share2, BookOpen, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

// Import blog images
import mervGuideImage from '@/assets/blog-merv-guide.jpg';
import filterSignsImage from '@/assets/blog-filter-signs.jpg';
import hepaComparisonImage from '@/assets/blog-hepa-comparison.jpg';
import springAllergiesImage from '@/assets/blog-spring-allergies.jpg';
import petOwnersImage from '@/assets/blog-pet-owners.jpg';

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
    image: mervGuideImage,
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
    image: filterSignsImage,
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
    image: hepaComparisonImage,
    tags: ["HEPA", "Product Comparison", "Air Quality", "Health"]
  },
  {
    id: 4,
    slug: "spring-allergy-filter-strategy",
    title: "Seasonal Air Filter Strategies: Optimizing for Spring Allergies",
    excerpt: "Spring brings beautiful weather but also increased pollen. Learn how to adjust your air filtration strategy for allergy season.",
    content: `
      <h2>Spring Allergy Season: What You're Up Against</h2>
      <p>Spring is beautiful, but for allergy sufferers, it can be miserable. Tree pollen, grass pollen, and mold spores fill the air, making indoor air quality crucial for comfort and health.</p>
      
      <h3>Common Spring Allergens</h3>
      <ul>
        <li><strong>Tree Pollen:</strong> Oak, maple, birch, and cedar release massive amounts of pollen</li>
        <li><strong>Grass Pollen:</strong> Bermuda, timothy, and bluegrass contribute to allergy symptoms</li>
        <li><strong>Mold Spores:</strong> Increased humidity and rain create ideal mold conditions</li>
        <li><strong>Dust Mites:</strong> Spring cleaning stirs up dust mite allergens</li>
      </ul>
      
      <h3>Upgrading Your Filter Strategy</h3>
      
      <h4>Pre-Season Preparation</h4>
      <p>Before allergy season hits, upgrade to a MERV 11-13 filter. These filters are specifically designed to capture the smaller particles that cause allergic reactions.</p>
      
      <h4>Increased Change Frequency</h4>
      <p>During peak allergy season, consider changing your filter every 30-45 days instead of the usual 60-90 days. Pollen loads can quickly overwhelm even high-quality filters.</p>
      
      <h4>Additional Strategies</h4>
      <ul>
        <li>Run your HVAC fan continuously during high pollen days</li>
        <li>Keep windows closed and use air conditioning</li>
        <li>Consider a whole-house air purifier for severe allergies</li>
        <li>Upgrade to electrostatic or pleated filters</li>
      </ul>
      
      <h3>Monitor Local Pollen Counts</h3>
      <p>Use local weather services and allergy apps to track daily pollen counts. On high pollen days, keep your HVAC system running and avoid outdoor activities during peak hours (usually morning).</p>
      
      <h3>Beyond Filtration</h3>
      <ul>
        <li>Regular duct cleaning</li>
        <li>HVAC system maintenance</li>
        <li>Humidity control (30-50% ideal)</li>
        <li>Regular vacuuming with HEPA vacuum</li>
      </ul>
      
      <p>With the right filter strategy and consistent maintenance, you can significantly reduce indoor allergens and enjoy spring comfort.</p>
    `,
    author: "Sarah Johnson",
    date: "2024-01-08",
    category: "Seasonal Tips",
    readTime: "7 min read",
    featured: false,
    image: springAllergiesImage,
    tags: ["Allergies", "Seasonal", "Pollen", "Health"]
  },
  {
    id: 6,
    slug: "pet-owners-filter-guide",
    title: "Indoor Air Quality and Pet Owners: Essential Filter Selection Guide",
    excerpt: "Pet dander, hair, and odors require special filtration considerations. Here's how to keep your air clean with furry family members.",
    content: `
      <h2>The Challenge of Pet-Related Air Quality Issues</h2>
      <p>Pets bring joy to our homes, but they also introduce unique air quality challenges. Pet dander, hair, and odors require specialized filtration strategies to maintain a healthy indoor environment.</p>
      
      <h3>Understanding Pet-Related Airborne Particles</h3>
      
      <h4>Pet Dander</h4>
      <p>Microscopic skin flakes from cats, dogs, and other pets are potent allergens. These particles are incredibly small (2.5 microns or less) and can remain airborne for hours.</p>
      
      <h4>Pet Hair and Fur</h4>
      <p>While larger than dander, pet hair carries dander and can clog filters quickly, especially during shedding seasons.</p>
      
      <h4>Odors and Bacteria</h4>
      <p>Pets can introduce bacteria, viruses, and odors that require specialized filtration to remove effectively.</p>
      
      <h3>Recommended Filter Types for Pet Owners</h3>
      
      <h4>MERV 11-13 Filters</h4>
      <p>These filters effectively capture pet dander and most airborne allergens while maintaining good airflow for your HVAC system.</p>
      
      <h4>Activated Carbon Filters</h4>
      <p>For odor control, consider filters with activated carbon layers that absorb pet odors and volatile organic compounds.</p>
      
      <h4>Electrostatic Filters</h4>
      <p>These washable filters use static electricity to attract and trap pet dander and hair, making them cost-effective for pet owners.</p>
      
      <h3>Special Considerations for Multiple Pets</h3>
      <ul>
        <li>Change filters every 30-45 days instead of 60-90 days</li>
        <li>Consider upgrading to a thicker filter (4-5 inch) for increased capacity</li>
        <li>Install additional air purifiers in pet-heavy areas</li>
        <li>Regular grooming reduces airborne dander</li>
      </ul>
      
      <h3>Maintenance Tips for Pet Owners</h3>
      <ul>
        <li>Check filters monthly for pet hair buildup</li>
        <li>Vacuum regularly with a HEPA-filtered vacuum</li>
        <li>Clean air ducts annually</li>
        <li>Maintain humidity levels between 30-50%</li>
        <li>Use air purifiers in bedrooms and main living areas</li>
      </ul>
      
      <h3>Signs Your Current Filter Isn't Working</h3>
      <ul>
        <li>Persistent pet odors</li>
        <li>Increased allergy symptoms</li>
        <li>Visible pet hair on vents</li>
        <li>Filter clogs quickly</li>
      </ul>
      
      <p>With the right filtration strategy, pet owners can enjoy clean air while keeping their beloved companions comfortable and healthy.</p>
    `,
    author: "Dr. Emily Rodriguez",
    date: "2024-01-03",
    category: "Pet Owners",
    readTime: "9 min read",
    featured: false,
    image: petOwnersImage,
    tags: ["Pet Owners", "Dander", "Allergies", "Air Quality"]
  }
];

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const post = blogPosts.find(p => p.slug === slug);
  const relatedPosts = blogPosts.filter(p => p.slug !== slug && p.category === post?.category).slice(0, 3);

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

          {/* Featured Image */}
          <div className="mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="flex items-center gap-2 mb-8 pb-8 border-b">
            <Tag className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Tags:</span>
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Author Bio */}
          <Card className="mb-12">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{post.author}</h3>
                  <p className="text-muted-foreground text-sm">
                    Expert contributor specializing in HVAC systems and indoor air quality. 
                    With years of experience in the industry, they provide practical insights 
                    for homeowners and professionals alike.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="group hover:shadow-card transition-all duration-300">
                  <CardContent className="p-0">
                    <Link to={`/blog/${relatedPost.slug}`}>
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline" className="text-xs">
                            {relatedPost.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{relatedPost.readTime}</span>
                        </div>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                          {relatedPost.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {relatedPost.excerpt}
                        </p>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BlogPost;