import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="shadow-lg">
            <CardContent className="p-12">
              <div className="flex justify-center mb-6">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Thank You for Your Message!
              </h1>
              
              <p className="text-lg text-muted-foreground mb-6">
                We've received your inquiry and truly appreciate you reaching out to AirCare Supply Co. 
                Our team of air quality experts will review your message and get back to you within 24 hours.
              </p>
              
              <p className="text-muted-foreground mb-8">
                In the meantime, you might find answers to common questions in our FAQ section.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="default" size="lg">
                  <Link to="/faq">Browse FAQ</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/">Return Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ThankYou;