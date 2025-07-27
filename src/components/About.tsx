import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Trophy } from "lucide-react";

const stats = [
  { icon: Users, label: "Happy Customers", value: "10,000+" },
  { icon: Clock, label: "Years Experience", value: "25+" },
  { icon: Trophy, label: "Industry Awards", value: "15+" },
  { icon: CheckCircle, label: "Products Delivered", value: "1M+" }
];

const About = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-12 h-1 bg-accent rounded-full" />
              <span className="text-primary font-medium">About AirCare Supply Co</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Your Trusted Partner in 
              <span className="text-primary block">Indoor Air Quality</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              For over 25 years, AirCare Supply Co has been the leading provider of premium 
              HVAC supplies and air filtration solutions. We understand that clean air isn't 
              just a luxury—it's essential for health, comfort, and productivity.
            </p>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our commitment to quality means every product we offer meets the highest 
              industry standards. From residential homes to large commercial facilities, 
              we provide the expertise and products needed to create optimal indoor environments.
            </p>
            
            <div className="space-y-4">
              {[
                "Certified HEPA and premium air filtration products",
                "Expert consultation and technical support",
                "Fast, reliable delivery nationwide",
                "Competitive pricing with bulk discounts"
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-card hover:shadow-card transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;