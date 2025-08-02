import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Clock, MessageCircle, Book, Video, Download } from "lucide-react";

const supportOptions = [
  {
    icon: MessageCircle,
    title: "Live Chat Support",
    description: "Get instant help from our air quality experts",
    action: "Start Chat",
    available: "Mon-Fri 8AM-6PM EST"
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send us a detailed message about your needs",
    action: "Send Email",
    available: "24/7 - Response within 4 hours"
  },
  {
    icon: Book,
    title: "Knowledge Base",
    description: "Browse our comprehensive FAQ and guides",
    action: "Browse FAQ",
    available: "Always available"
  },
  {
    icon: Video,
    title: "Installation Videos",
    description: "Step-by-step video guides for filter installation",
    action: "Watch Videos",
    available: "Always available"
  }
];

const resources = [
  {
    title: "Filter Size Guide",
    description: "Complete guide to measuring and finding your filter size",
    type: "PDF Guide",
    icon: Download
  },
  {
    title: "MERV Rating Chart",
    description: "Detailed comparison of all MERV ratings and their applications",
    type: "Reference Chart",
    icon: Download
  },
  {
    title: "Maintenance Schedule",
    description: "Printable maintenance calendar for filter changes",
    type: "PDF Calendar",
    icon: Download
  },
  {
    title: "Troubleshooting Guide",
    description: "Common HVAC issues and how air filters can help",
    type: "PDF Guide",
    icon: Download
  }
];

const Support = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-12 h-1 bg-accent rounded-full" />
              <span className="text-primary font-medium">Customer Support</span>
              <div className="w-12 h-1 bg-accent rounded-full" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              We're Here to
              <span className="text-primary block">Help You</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Get expert support for all your air filtration needs. Our team of specialists 
              is ready to help you find the perfect solution and answer any questions.
            </p>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Choose Your Support Channel
            </h2>
            <p className="text-lg text-muted-foreground">
              Multiple ways to get the help you need, when you need it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {supportOptions.map((option, index) => (
              <Card key={index} className="bg-card hover:shadow-card transition-all duration-300 group">
                <CardContent className="p-4 md:p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <option.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{option.title}</h3>
                  <p className="text-muted-foreground mb-4">{option.description}</p>
                  <p className="text-sm text-primary font-medium mb-4">{option.available}</p>
                  <Button variant="outline" className="w-full">
                    {option.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Submit a Support Request
              </h2>
              <p className="text-lg text-muted-foreground">
                Fill out the form below and we'll get back to you within 4 hours.
              </p>
            </div>

            <Card className="bg-card">
              <CardContent className="p-6 md:p-8">
                <form className="space-y-4 md:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Name *
                      </label>
                      <Input placeholder="Your full name" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <Input type="email" placeholder="your.email@company.com" required />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Order Number
                      </label>
                      <Input placeholder="Order #12345 (if applicable)" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Support Category
                      </label>
                      <select className="w-full p-3 border border-border rounded-md bg-background text-foreground">
                        <option value="">Select a category</option>
                        <option value="product-question">Product Questions</option>
                        <option value="sizing-help">Filter Sizing Help</option>
                        <option value="installation">Installation Support</option>
                        <option value="order-status">Order Status</option>
                        <option value="returns">Returns & Exchanges</option>
                        <option value="technical">Technical Issues</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Subject *
                    </label>
                    <Input placeholder="Brief description of your issue" required />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <Textarea 
                      placeholder="Please provide as much detail as possible about your question or issue..."
                      rows={6}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" size="lg">
                    Submit Support Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Helpful Resources
            </h2>
            <p className="text-lg text-muted-foreground">
              Download guides, charts, and tools to help you get the most from your air filters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {resources.map((resource, index) => (
              <Card key={index} className="bg-card hover:shadow-card transition-all duration-300 group">
                <CardContent className="p-4 md:p-6">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <resource.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{resource.title}</h3>
                  <p className="text-muted-foreground mb-3 text-sm">{resource.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-primary font-medium">{resource.type}</span>
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              Need Immediate Assistance?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-card">
                <CardContent className="p-6 text-center">
                  <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Email Support</h3>
                  <p className="text-muted-foreground mb-4">Get detailed help via email</p>
                  <p className="text-primary font-medium">support@aircaresupplyco.com</p>
                  <p className="text-sm text-muted-foreground mt-2">Response within 4 hours</p>
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardContent className="p-6 text-center">
                  <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Business Hours</h3>
                  <p className="text-muted-foreground mb-4">When our team is available</p>
                  <p className="text-foreground font-medium">Monday - Friday</p>
                  <p className="text-foreground">8:00 AM - 6:00 PM EST</p>
                  <p className="text-sm text-muted-foreground mt-2">Emergency support available</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Support;