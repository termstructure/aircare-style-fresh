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
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="shadow-lg">
            <CardContent className="p-6 sm:p-8 md:p-12">
              <div className="flex justify-center mb-4 sm:mb-6">
                <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-500" />
              </div>
              
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
                Thank You for Your Message!
              </h1>
              
              <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                We've received your inquiry and truly appreciate you reaching out to AirCare Supply Co. 
                Our team of air quality experts will review your message and get back to you within 24 hours.
              </p>
              
              <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
                In the meantime, you might find answers to common questions in our FAQ section.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button asChild variant="default" size="lg" className="h-12 sm:h-11 text-base sm:text-sm">
                  <Link to="/faq">Browse FAQ</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 sm:h-11 text-base sm:text-sm">
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