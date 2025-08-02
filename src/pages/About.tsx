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
    description: "As a small business, we're committed to providing quality products and genuine customer service."
  },
  {
    icon: BookOpen,
    title: "Education Over Sales",
    description: "We provide comprehensive product information and guides to help you make informed decisions about your air filtration needs."
  },
  {
    icon: Star,
    title: "Real Impact",
    description: "Quality air filters that help improve your home's air quality and HVAC system efficiency."
  },
  {
    icon: HandHeart,
    title: "Genuine Support",
    description: "Helpful customer service from people who understand air filtration and want to help you find the right solution."
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
                Like many homeowners, we discovered the importance of air filtration through experience. 
                Rising energy bills and indoor air quality concerns led us to learn about the significant 
                impact that quality air filters have on both system efficiency and air quality.
              </p>
              
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We realized that many people, like ourselves, weren't fully aware of how air filters 
                affect their HVAC system performance and indoor air quality. This simple but crucial 
                component of home maintenance often gets overlooked, despite its importance for both 
                health and energy efficiency.
              </p>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                AirCare Supply Co was founded to bridge this knowledge gap and provide quality air 
                filtration products with the information needed to make smart choices. We're here to 
                help customers understand their options and find the right solutions for their homes.
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
                  To provide quality air filtration products and expert guidance that help customers 
                  create healthier indoor environments and improve their HVAC system efficiency.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-3">Our Vision</h3>
                <p className="text-muted-foreground">
                  To be the trusted source for air filtration products and education, helping 
                  customers make informed decisions about their indoor air quality needs.
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
                We're a small business focused on providing quality products with the personal service you deserve.
              </p>
            </div>
            
            <div className="space-y-6">
              {[
                "Carefully selected quality air filtration products from trusted brands",
                "Personalized recommendations based on your specific needs",
                "Fast, reliable shipping with same-day processing for most orders",
                "Knowledgeable customer support when you need help",
                "Clear product information and educational resources",
                "Transparent pricing with no hidden fees",
                "Personal service from a local Charlotte, NC small business",
                "Small business flexibility and responsiveness"
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