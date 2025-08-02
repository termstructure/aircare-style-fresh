import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, MapPin, Clock, Shield, Heart, BookOpen, Star, HandHeart, Target, Zap } from "lucide-react";

const stats = [
  { icon: Heart, label: "Small Business Care", value: "100%" },
  { icon: Target, label: "Customer Satisfaction Goal", value: "100%" },
  { icon: Zap, label: "Same-Day Processing", value: "24hr" },
  { icon: Shield, label: "Quality Focused", value: "Always" }
];

const values = [
  {
    icon: Heart,
    title: "We Actually Care",
    description: "Because we've experienced the problems ourselves - poor air quality affects real families, including ours."
  },
  {
    icon: BookOpen,
    title: "Education Over Sales",
    description: "We'd rather teach you why air quality matters than pressure you into buying something you don't need."
  },
  {
    icon: Star,
    title: "Real Impact",
    description: "Health improvements and energy savings that make a genuine difference in your daily life."
  },
  {
    icon: HandHeart,
    title: "Genuine Support",
    description: "Personal help from people who understand because we've been in your shoes."
  }
];

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-12 h-1 bg-accent rounded-full" />
              <span className="text-primary font-medium">About AirCare Supply Co</span>
              <div className="w-12 h-1 bg-accent rounded-full" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Revolutionizing 
              <span className="text-primary block">Indoor Air Quality</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Based in Charlotte, NC, AirCare Supply Co is a fresh, innovative company 
              dedicated to transforming how people think about and manage their indoor air quality.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-card hover:shadow-card transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-muted-foreground font-medium text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                It started with my family's struggles. My daughter's constant sneezing, my own headaches, 
                and energy bills that seemed to climb every month. We thought it was just "one of those things" 
                until an HVAC technician mentioned something that changed everything: "When's the last time 
                you changed your air filter?"
              </p>
              
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                That dirty, clogged filter wasn't just affecting our health—it was forcing our system to 
                work overtime, driving up our electricity costs. But here's what really frustrated me: 
                nobody had ever explained this connection. This simple piece of home maintenance that 
                impacts both health and energy consumption was completely overlooked.
              </p>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                That's why we started AirCare Supply Co. Not to sell filters, but to spread awareness 
                about something that affects every home, every family. We want to help people avoid 
                the same problems we faced by understanding the real importance of clean air filtration.
              </p>
              
              <div className="flex items-center space-x-3 text-primary">
                <MapPin className="w-6 h-6" />
                <span className="text-lg font-semibold">Proudly based in Charlotte, NC</span>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-3">Our Mission</h3>
                <p className="text-muted-foreground">
                  To democratize access to premium air filtration solutions and empower everyone 
                  to create healthier indoor environments for their families and businesses.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-3">Our Vision</h3>
                <p className="text-muted-foreground">
                  A world where clean, healthy indoor air is the standard, not the exception, 
                  and where everyone has access to the knowledge and products needed to achieve it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These core principles guide everything we do and shape how we serve our customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-card hover:shadow-card transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                What Makes Us Different
              </h2>
              <p className="text-xl text-muted-foreground">
                We're not just another HVAC supplier—we're your partners in creating healthier indoor environments.
              </p>
            </div>
            
            <div className="space-y-6">
              {[
                "Expert curation of only the highest-quality air filtration products",
                "Personalized recommendations based on your specific needs and environment",
                "Fast, reliable shipping with same-day processing for most orders",
                "Comprehensive customer support from real air quality experts",
                "Educational resources to help you make informed decisions",
                "Competitive pricing with transparent, no-surprise costs",
                "Personal service from a local Charlotte, NC business",
                "Comprehensive product information and guidance"
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4 bg-card p-4 rounded-lg border">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <span className="text-foreground text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;