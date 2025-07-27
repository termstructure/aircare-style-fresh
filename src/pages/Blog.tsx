import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, User, Tag, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "The Complete Guide to MERV Ratings: Choosing the Right Filter for Your Home",
    excerpt: "Understanding MERV ratings is crucial for selecting the right air filter. Learn how different ratings affect air quality, energy efficiency, and system performance.",
    author: "Sarah Johnson",
    date: "2024-01-15",
    category: "Education",
    readTime: "8 min read",
    featured: true,
    image: "/api/placeholder/600/400"
  },
  {
    id: 2,
    title: "5 Signs It's Time to Change Your Air Filter (And What Happens If You Don't)",
    excerpt: "Recognizing when to change your air filter can save you money and improve your health. Here are the key warning signs you shouldn't ignore.",
    author: "Mike Chen",
    date: "2024-01-12",
    category: "Maintenance",
    readTime: "6 min read",
    featured: false
  },
  {
    id: 3,
    title: "HEPA vs. Standard Filters: Which One Do You Really Need?",
    excerpt: "HEPA filters promise superior air cleaning, but are they right for your HVAC system? We break down the pros, cons, and costs.",
    author: "Dr. Emily Rodriguez",
    date: "2024-01-10",
    category: "Product Guide",
    readTime: "10 min read",
    featured: true
  },
  {
    id: 4,
    title: "Seasonal Air Filter Strategies: Optimizing for Spring Allergies",
    excerpt: "Spring brings beautiful weather but also increased pollen. Learn how to adjust your air filtration strategy for allergy season.",
    author: "Sarah Johnson",
    date: "2024-01-08",
    category: "Seasonal Tips",
    readTime: "7 min read",
    featured: false
  },
  {
    id: 5,
    title: "The Hidden Costs of Cheap Air Filters: A Long-Term Analysis",
    excerpt: "Budget filters might seem economical, but they could be costing you more in the long run. We analyze the true cost of air filtration.",
    author: "David Park",
    date: "2024-01-05",
    category: "Cost Analysis",
    readTime: "12 min read",
    featured: false
  },
  {
    id: 6,
    title: "Indoor Air Quality and Pet Owners: Essential Filter Selection Guide",
    excerpt: "Pet dander, hair, and odors require special filtration considerations. Here's how to keep your air clean with furry family members.",
    author: "Dr. Emily Rodriguez",
    date: "2024-01-03",
    category: "Pet Owners",
    readTime: "9 min read",
    featured: false
  },
  {
    id: 7,
    title: "Commercial vs. Residential Air Filters: Understanding the Differences",
    excerpt: "Commercial and residential air filters serve different needs. Learn which specifications matter for your specific application.",
    author: "Mike Chen",
    date: "2023-12-28",
    category: "Commercial",
    readTime: "11 min read",
    featured: false
  },
  {
    id: 8,
    title: "DIY Filter Installation: Step-by-Step Guide with Common Mistakes to Avoid",
    excerpt: "Installing air filters seems simple, but small mistakes can reduce effectiveness. Follow our guide for perfect installation every time.",
    author: "Sarah Johnson",
    date: "2023-12-25",
    category: "DIY Guide",
    readTime: "5 min read",
    featured: false
  }
];

const categories = [
  "All Posts",
  "Education", 
  "Maintenance", 
  "Product Guide", 
  "Seasonal Tips", 
  "Cost Analysis", 
  "Pet Owners", 
  "Commercial", 
  "DIY Guide"
];

const Blog = () => {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const recentPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-12 h-1 bg-accent rounded-full" />
              <span className="text-primary font-medium">AirCare Blog</span>
              <div className="w-12 h-1 bg-accent rounded-full" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Air Quality
              <span className="text-primary block">Insights & Tips</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Expert advice, maintenance tips, and industry insights to help you make 
              informed decisions about your indoor air quality and filtration needs.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="px-4 py-2 cursor-pointer hover:bg-muted transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Featured Articles</h2>
            <Badge className="bg-primary text-primary-foreground">Editor's Choice</Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="bg-card hover:shadow-card transition-all duration-300 group overflow-hidden">
                <div className="aspect-video bg-gradient-primary/10 flex items-center justify-center">
                  <span className="text-muted-foreground">Featured Image</span>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Badge variant="outline" className="text-xs">
                      {post.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors cursor-pointer">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CalendarDays className="w-4 h-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform cursor-pointer" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">Recent Articles</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Card key={post.id} className="bg-card hover:shadow-card transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Badge variant="outline" className="text-xs">
                      {post.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors cursor-pointer">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform cursor-pointer" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get the latest air quality tips, product updates, and exclusive offers 
              delivered straight to your inbox.
            </p>
            
            <Card className="bg-card">
              <CardContent className="p-8">
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                    Subscribe
                  </button>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  No spam, unsubscribe at any time. We respect your privacy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;