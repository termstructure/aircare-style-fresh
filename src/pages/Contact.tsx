import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    content: "support@aircaresupplyco.com",
    subtitle: "24/7 response within 4 hours"
  },
  {
    icon: MapPin,
    title: "Location",
    content: "Charlotte, NC",
    subtitle: "Serving nationwide"
  },
  {
    icon: Clock,
    title: "Business Hours",
    content: "Mon-Fri 8AM-6PM EST",
    subtitle: "Emergency support available"
  }
];

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-section-fluid-lg bg-gradient-subtle">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-4 sm:mb-6">
              <div className="w-8 sm:w-12 h-1 bg-accent rounded-full" />
              <span className="text-primary font-medium text-sm sm:text-base">Get In Touch</span>
              <div className="w-8 sm:w-12 h-1 bg-accent rounded-full" />
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-4 sm:mb-6">
              Contact
              <span className="text-primary block">AirCare Supply Co</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Have questions about our products or need expert advice? We're here to help you 
              find the perfect air filtration solution for your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-section-fluid-lg bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20">
            {contactInfo.map((info, index) => (
              <Card key={index} className="bg-card hover:shadow-card transition-shadow duration-300">
                <CardContent className="p-4 md:p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <info.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{info.title}</h3>
                  <p className="text-lg text-foreground font-medium">{info.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-section-fluid-md bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Send Us a Message
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Fill out the form below and our air quality experts will get back to you 
                within 4 hours. We're committed to helping you breathe easier.
              </p>
              
                <Card className="bg-card">
                <CardContent className="p-6 md:p-8">
                  <form className="space-y-4 md:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          First Name *
                        </label>
                        <Input placeholder="Your first name" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Last Name *
                        </label>
                        <Input placeholder="Your last name" required />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <Input type="email" placeholder="your.email@company.com" required />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone Number *
                      </label>
                      <Input type="tel" placeholder="Your phone number" required />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Company Name
                      </label>
                      <Input placeholder="Your company (optional)" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Subject *
                      </label>
                      <Input placeholder="How can we help you?" required />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Message *
                      </label>
                      <Textarea 
                        placeholder="Tell us more about your air filtration needs..."
                        rows={6}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full" size="lg">
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            {/* Why Contact Us */}
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-8">
                Why Choose AirCare Supply Co?
              </h3>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Easy Shopping Experience",
                    description: "Browse our selection online or get personalized recommendations to find the right products for your home."
                  },
                  {
                    title: "Quality Products",
                    description: "We carry trusted brands and reliable filters that help keep your home's air clean and fresh."
                  },
                  {
                    title: "Helpful Support",
                    description: "Our friendly team is here to answer questions and help you choose the best options for your needs."
                  },
                  {
                    title: "Convenient Service",
                    description: "From easy ordering to reliable delivery, we make it simple to maintain your home's air quality."
                  },
                  {
                    title: "Trusted Partnership",
                    description: "We build lasting relationships with our customers through reliable service and ongoing support for all your air quality needs."
                  }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="text-base md:text-lg font-semibold text-foreground mb-1 md:mb-2">{benefit.title}</h4>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Quick Contact */}
              <div className="mt-10 p-6 bg-card rounded-lg border">
                <h4 className="text-xl font-semibold text-foreground mb-4">Need Immediate Help?</h4>
                <p className="text-muted-foreground mb-4">
                  For urgent inquiries or technical support, reach out directly:
                </p>
                <div className="flex items-center space-x-3 text-primary">
                  <Mail className="w-5 h-5" />
                  <span className="font-medium">support@aircaresupplyco.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-section-fluid-md bg-background">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground">
                Quick answers to common questions about our products and services.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  question: "What sizes of air filters do you carry?",
                  answer: "We carry all standard HVAC filter sizes from 14x14 to 25x25 and everything in between."
                },
                {
                  question: "How often should I change my air filter?",
                  answer: "Most filters should be changed every 1-3 months, depending on usage, air quality, and filter type. We provide specific recommendations with each product."
                },
                {
                  question: "What's your return policy?",
                  answer: "We work with you to resolve any product concerns. Contact us if you have any issues and we'll help find the right solution."
                },
                {
                  question: "How fast is shipping?",
                  answer: "Most orders ship within 24 hours and arrive within 2-5 business days. We offer expedited shipping options for urgent needs."
                },
                {
                  question: "Do you provide installation services?",
                  answer: "While we don't provide installation, we offer detailed guides and can recommend certified HVAC technicians in your area if needed."
                },
                {
                  question: "What MERV ratings do you offer?",
                  answer: "We carry filters with MERV ratings from 8 to 16, providing options for basic dust protection to advanced allergen and bacteria filtration."
                }
              ].map((faq, index) => (
                <Card key={index} className="bg-card">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold text-foreground mb-3">{faq.question}</h4>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;