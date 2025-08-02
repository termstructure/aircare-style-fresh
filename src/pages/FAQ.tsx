import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const categories = [
  { id: "all", label: "All Questions", count: 24 },
  { id: "basics", label: "Air Filter Basics", count: 8 },
  { id: "merv", label: "MERV Ratings", count: 6 },
  { id: "maintenance", label: "Maintenance", count: 5 },
  { id: "sizing", label: "Sizing & Fit", count: 5 }
];

const faqs = [
  {
    id: 1,
    category: "basics",
    question: "What is an air filter and why do I need one?",
    answer: "An air filter is a device that removes particles, allergens, and contaminants from the air flowing through your HVAC system. It protects your equipment from dust buildup and improves indoor air quality by capturing particles like dust, pollen, pet dander, and bacteria before they circulate through your home."
  },
  {
    id: 2,
    category: "maintenance",
    question: "How often should I change my air filter?",
    answer: "Most experts recommend checking your filter monthly and changing it every 1-3 months, depending on several factors: Basic fiberglass filters (MERV 1-4): Every 30 days, Pleated filters (MERV 5-12): Every 60-90 days, High-efficiency filters (MERV 13+): Every 90 days. Change more frequently if you have pets, allergies, or during peak heating/cooling seasons."
  },
  {
    id: 3,
    category: "merv",
    question: "What is a MERV rating and why does it matter?",
    answer: "MERV stands for Minimum Efficiency Reporting Value, a scale from 1-20 developed by ASHRAE (American Society of Heating, Refrigerating and Air-Conditioning Engineers) in 1987. Higher MERV ratings capture smaller particles: MERV 1-4: Basic protection (dust, pollen), MERV 5-8: Better filtration (mold, pet dander), MERV 9-12: Superior protection (fine dust, smoke), MERV 13-16: High efficiency (bacteria, virus particles), MERV 17-20: HEPA level (medical grade)."
  },
  {
    id: 4,
    category: "sizing",
    question: "How do I find the right size air filter for my system?",
    answer: "There are three ways to find your filter size: 1) Check the existing filter - the size is usually printed on the frame, 2) Measure the filter slot in your HVAC unit (length x width x depth), 3) Check your HVAC unit manual or manufacturer specifications. Common residential sizes include 16x20x1, 16x25x1, 20x20x1, 20x25x1, and 24x24x1 inches."
  },
  {
    id: 5,
    category: "merv",
    question: "What's the difference between MERV, MPR, and FPR ratings?",
    answer: "These are different rating systems: MERV (Minimum Efficiency Reporting Value) is the industry standard scale 1-20 used by most manufacturers. MPR (Microparticle Performance Rating) is 3M's proprietary scale from 300-2800. FPR (Filter Performance Rating) is Home Depot's scale from 4-10. MERV is the most widely accepted and comparable standard across all filter brands."
  },
  {
    id: 6,
    category: "basics",
    question: "What's the difference between HEPA and standard air filters?",
    answer: "HEPA (High Efficiency Particulate Air) filters must capture 99.97% of particles 0.3 microns or larger, equivalent to MERV 17-20. Standard HVAC filters typically range from MERV 1-16. True HEPA filters are usually too restrictive for most residential HVAC systems and are primarily used in air purifiers, hospitals, and clean rooms."
  },
  {
    id: 7,
    category: "maintenance",
    question: "What happens if I don't change my air filter regularly?",
    answer: "Neglecting filter changes leads to several problems: Reduced air quality and increased allergens, Higher energy bills due to restricted airflow, Shortened HVAC system lifespan, Potential system damage from dust buildup, Uneven heating/cooling throughout your home, Frozen evaporator coils in summer, Overheating in winter."
  },
  {
    id: 8,
    category: "basics",
    question: "Should I use a higher MERV rating for better air quality?",
    answer: "Not necessarily. While higher MERV ratings capture smaller particles, they also restrict airflow more. Most residential systems work best with MERV 8-13 filters. Using a MERV rating too high for your system can cause: Reduced airflow, Higher energy costs, System strain and potential damage. Consult your HVAC manual or a professional to determine the highest MERV rating your system can handle."
  },
  {
    id: 9,
    category: "sizing",
    question: "Can I use a slightly different sized filter if I can't find my exact size?",
    answer: "No, you should always use the exact size specified for your system. A filter that's too small will allow unfiltered air to bypass around the edges, while a filter that's too large won't fit properly and may damage your system. If you can't find your exact size, contact the manufacturer or a local HVAC supplier for custom sizing options."
  },
  {
    id: 10,
    category: "merv",
    question: "Are expensive filters always better?",
    answer: "Not always. The best filter depends on your specific needs and HVAC system capabilities. Expensive HEPA-level filters may be overkill for most homes and can strain your system. Consider your priorities: For basic dust protection, MERV 6-8 filters are cost-effective. For allergies, MERV 11-13 offers good particle capture. For immune-compromised individuals, MERV 13-16 may be worth the extra cost."
  },
  {
    id: 11,
    category: "maintenance",
    question: "How can I tell if my air filter needs to be changed?",
    answer: "Signs your filter needs changing: Visual inspection shows the filter is gray/brown and clogged, Increased dust accumulation around your home, Reduced airflow from vents, Higher than normal energy bills, Your HVAC system running longer cycles, Musty or stale odors from vents, Family members experiencing increased allergy symptoms."
  },
  {
    id: 12,
    category: "basics",
    question: "What materials are air filters made from?",
    answer: "Air filters are made from various materials: Fiberglass: Inexpensive, basic protection (MERV 1-4), Pleated paper/cotton: Better particle capture (MERV 5-12), Synthetic media: High efficiency, durable (MERV 13-16), Activated carbon: Adds odor and gas removal, Antimicrobial coatings: Inhibit bacteria and mold growth, Electrostatic: Attracts particles using static charge."
  },
  {
    id: 13,
    category: "sizing",
    question: "What do the numbers on air filter sizes mean?",
    answer: "Air filter dimensions are listed as Length x Width x Depth (thickness) in inches. For example, a 16x25x1 filter is 16 inches long, 25 inches wide, and 1 inch thick. The actual dimensions are usually slightly smaller (about 0.25-0.5 inches) to ensure proper fit in the filter slot."
  },
  {
    id: 14,
    category: "merv",
    question: "Is MERV 13 good for COVID protection?",
    answer: "MERV 13 filters can capture some virus-carrying particles, as they're effective against particles down to 0.3-1.0 microns. However, viruses are much smaller (0.1 microns). MERV 13+ filters are more effective when combined with other measures like proper ventilation, but they're not a complete solution for airborne virus protection."
  },
  {
    id: 15,
    category: "basics",
    question: "Can air filters help with allergies?",
    answer: "Yes, quality air filters can significantly reduce airborne allergens. For allergy relief, choose MERV 11-13 filters which capture: Pollen (10-100 microns), Dust mites and debris (0.5-50 microns), Pet dander (0.5-20 microns), Mold spores (1-30 microns). Combine with regular filter changes and proper HVAC maintenance for best results."
  },
  {
    id: 16,
    category: "maintenance",
    question: "Can I clean and reuse my air filter?",
    answer: "Most residential air filters are disposable and should not be cleaned or reused. Attempting to clean pleated or fiberglass filters can damage them and reduce effectiveness. Some washable filters exist, but they're specifically designed for reuse and clearly labeled as such. Reusable filters typically have lower MERV ratings and require proper cleaning and complete drying."
  },
  {
    id: 17,
    category: "sizing",
    question: "Why are there so many different air filter sizes?",
    answer: "Different HVAC systems and manufacturers use various filter slot dimensions to accommodate different airflow requirements, space constraints, and design preferences. Older systems often use non-standard sizes, while newer systems typically use more common dimensions. The variety ensures optimal airflow and filtration for each specific system design."
  },
  {
    id: 18,
    category: "basics",
    question: "Do expensive filters last longer than cheap ones?",
    answer: "Not necessarily. Filter lifespan depends more on usage conditions than price. Factors affecting lifespan include: Air quality in your area, Number of occupants and pets, HVAC system runtime, Filter MERV rating (higher MERV may clog faster). A basic $5 filter might last the same 1-3 months as a $25 filter under identical conditions."
  },
  {
    id: 19,
    category: "merv",
    question: "What MERV rating should I use for pets?",
    answer: "For homes with pets, MERV 8-11 filters are typically recommended. They effectively capture pet dander (0.5-20 microns) and hair while maintaining good airflow. If family members have severe pet allergies, consider MERV 11-13. Remember to change filters more frequently with pets - potentially every 30-60 days instead of 90 days."
  },
  {
    id: 20,
    category: "maintenance",
    question: "Where should I store extra air filters?",
    answer: "Store filters in a cool, dry place away from moisture, extreme temperatures, and direct sunlight. Good storage locations include: Indoor closets or utility rooms, Basement (if dry and climate controlled), Garage (if temperature stable). Avoid attics, damp basements, or areas with high humidity as moisture can damage filter media and promote mold growth."
  },
  {
    id: 21,
    category: "sizing",
    question: "What are the most common air filter sizes?",
    answer: "The most common residential air filter sizes include: 16x20x1, 16x25x1, 20x20x1, 20x25x1, 24x24x1, 16x20x4, 20x25x4. The '1' indicates a 1-inch thick filter, while '4' indicates a 4-inch thick filter. Thicker filters generally last longer and have more surface area for better filtration."
  },
  {
    id: 22,
    category: "basics",
    question: "Are washable air filters worth it?",
    answer: "Washable filters can be cost-effective long-term but have trade-offs: Pros: One-time purchase, environmentally friendly, no replacement costs. Cons: Lower MERV ratings (typically 1-4), require regular cleaning and complete drying, less convenient than disposables, may not capture smaller particles effectively. They're best for basic dust protection rather than allergy control."
  },
  {
    id: 23,
    category: "merv",
    question: "Can a filter's MERV rating be too high for my system?",
    answer: "Yes, using a MERV rating too high for your system can cause problems. Most residential systems are designed for MERV 8-13 filters. Using MERV 16+ filters designed for commercial systems can: Restrict airflow significantly, Increase energy consumption, Cause system overwork and premature failure, Create pressure imbalances. Check your HVAC manual for the maximum recommended MERV rating."
  },
  {
    id: 24,
    category: "basics",
    question: "Do air filters help with odors?",
    answer: "Standard pleated filters provide minimal odor control as they primarily capture particles, not gases. For odor control, look for filters with activated carbon, which absorbs gases and odors from: Cooking, Pets, Smoke, Household chemicals, Paint fumes. These combination filters typically cost more but provide both particle and odor filtration."
  }
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (id: number) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-12 h-1 bg-accent rounded-full" />
              <span className="text-primary font-medium">Air Filter FAQ</span>
              <div className="w-12 h-1 bg-accent rounded-full" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Frequently Asked
              <span className="text-primary block">Questions</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
              Everything you need to know about air filters, MERV ratings, sizing, 
              and maintenance. Expert answers to help you make informed decisions.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 md:w-5 md:h-5" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions..."
                className="pl-10 md:pl-12 py-3 md:py-4 text-base md:text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 md:py-8 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
            {categories.map((category) => (
              <Badge
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`px-4 py-2 cursor-pointer transition-all duration-200 ${
                  selectedCategory === category.id 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-muted"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <Filter className="w-4 h-4 mr-2" />
                {category.label} ({category.count})
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {searchQuery && (
              <div className="mb-8">
                <p className="text-muted-foreground">
                  Found {filteredFAQs.length} result{filteredFAQs.length !== 1 ? 's' : ''} for "{searchQuery}"
                </p>
              </div>
            )}

            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <Card key={faq.id} className="bg-card hover:shadow-card transition-shadow duration-200">
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleExpanded(faq.id)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors duration-200"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <HelpCircle className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground pr-4">
                          {faq.question}
                        </h3>
                      </div>
                      {expandedItems.includes(faq.id) ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      )}
                    </button>
                    
                    {expandedItems.includes(faq.id) && (
                      <div className="px-6 pb-6">
                        <div className="ml-12">
                          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredFAQs.length === 0 && (
              <div className="text-center py-16">
                <HelpCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-foreground mb-2">No results found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or selecting a different category.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Still Have Questions?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our air quality experts are here to help you find the perfect filtration solution 
              for your specific needs. Get personalized recommendations and expert advice.
            </p>
            <div className="flex justify-center">
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Contact Our Experts
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;