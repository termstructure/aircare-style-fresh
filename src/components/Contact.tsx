import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Call Us",
    content: "(555) 123-4567",
    subtitle: "Mon-Fri 8AM-6PM EST"
  },
  {
    icon: Mail,
    title: "Email Us",
    content: "info@aircaresupply.com",
    subtitle: "24/7 response"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    content: "123 Industrial Blvd",
    subtitle: "Atlanta, GA 30309"
  },
  {
    icon: Clock,
    title: "Business Hours",
    content: "Mon-Fri: 8AM-6PM",
    subtitle: "Sat: 9AM-3PM"
  }
];

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-1 bg-primary rounded-full" />
            <span className="text-primary font-medium">Get In Touch</span>
            <div className="w-12 h-1 bg-primary rounded-full" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Improve Your Air Quality?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Contact our experts today for personalized recommendations and competitive pricing 
            on all your HVAC supply needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground mb-6">Contact Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <Card key={index} className="bg-card hover:shadow-card transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{info.title}</h4>
                        <p className="text-foreground font-medium">{info.content}</p>
                        <p className="text-sm text-muted-foreground">{info.subtitle}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-card shadow-elegant">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Send Us a Message</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      First Name
                    </label>
                    <Input placeholder="Your first name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Last Name
                    </label>
                    <Input placeholder="Your last name" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <Input type="email" placeholder="your.email@company.com" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <Input type="tel" placeholder="(555) 123-4567" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea 
                    placeholder="Tell us about your HVAC supply needs..."
                    className="min-h-[120px]"
                  />
                </div>
                
                <Button variant="hero" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;