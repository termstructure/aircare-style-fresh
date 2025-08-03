import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Heart, Target, Zap } from "lucide-react";
const stats = [{
  icon: Heart,
  label: "Small Business Care",
  value: "100%"
}, {
  icon: Target,
  label: "Customer Satisfaction Goal",
  value: "100%"
}, {
  icon: Zap,
  label: "Same-Day Processing",
  value: "24hr"
}, {
  icon: CheckCircle,
  label: "Quality Focused",
  value: "Always"
}];
const About = () => {
  return <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-12 h-1 bg-accent rounded-full" />
              <span className="text-primary font-medium">About AirCare Supply Co</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Your Source for 
              <span className="text-primary block">Quality Air Filters</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">AirCare Supply Co is a company dedicated to quality products and helpful customer service in air filtration. We believe that everyone deserves clean, healthy air in their homes and workplaces—and we're here to help you achieve that through proper filter maintenance and regular replacement.</p>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Built on a foundation of good service and customer support, we focus 
              on helping you understand the functional benefits of clean air. Our carefully 
              selected products and helpful guidance ensure you maintain optimal indoor air 
              quality through consistent filter care.
            </p>
            
            <div className="space-y-4">
              {["Quality air filtration products from trusted brands", "Helpful customer support and product guidance", "Fast, reliable delivery nationwide", "Wide selection of trusted brand products"].map((item, index) => <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>)}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => <Card key={index} className="bg-card hover:shadow-card transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </div>
    </section>;
};
export default About;