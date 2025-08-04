import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, User, Tag, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    slug: "complete-guide-merv-ratings",
    title: "The Complete Guide to MERV Ratings: Choosing the Right Filter for Your Home",
    excerpt: "Understanding MERV ratings is crucial for selecting the right air filter. Learn how different ratings affect air quality, energy efficiency, and system performance.",
    author: "Sarah Johnson",
    date: "2024-01-15",
    category: "Education",
    readTime: "8 min read",
    featured: true
  },
  {
    id: 2,
    slug: "signs-change-air-filter",
    title: "5 Signs It's Time to Change Your Air Filter (And What Happens If You Don't)",
    excerpt: "Recognizing when to change your air filter can save you money and improve your health. Here are the key warning signs you shouldn't ignore.",
    author: "Mike Chen",
    date: "2024-01-12",
    category: "Maintenance",
    readTime: "6 min read",
    featured: false
  },
  {
    id: 3,
    slug: "hepa-vs-standard-filters",
    title: "HEPA vs. Standard Filters: Which One Do You Really Need?",
    excerpt: "HEPA filters promise effective air cleaning, but are they right for your HVAC system? We break down the pros, cons, and costs.",
    author: "Dr. Emily Rodriguez",
    date: "2024-01-10",
    category: "Product Guide",
    readTime: "10 min read",
    featured: true
  },
  {
    id: 4,
    slug: "spring-allergy-filter-strategy",
    title: "Seasonal Air Filter Strategies: Optimizing for Spring Allergies",
    excerpt: "Spring brings beautiful weather but also increased pollen. Learn how to adjust your air filtration strategy for allergy season.",
    author: "Sarah Johnson",
    date: "2024-01-08",
    category: "Seasonal Tips",
    readTime: "7 min read",
    featured: false
  },
  {
    id: 5,
    slug: "hidden-costs-cheap-filters",
    title: "The Hidden Costs of Cheap Air Filters: A Long-Term Analysis",
    excerpt: "Budget filters might seem economical, but they could be costing you more in the long run. We analyze the true cost of air filtration.",
    author: "David Park",
    date: "2024-01-05",
    category: "Cost Analysis",
    readTime: "12 min read",
    featured: false
  },
  {
    id: 6,
    slug: "pet-owners-filter-guide",
    title: "Indoor Air Quality and Pet Owners: Essential Filter Selection Guide",
    excerpt: "Pet dander, hair, and odors require special filtration considerations. Here's how to keep your air clean with furry family members.",
    author: "Dr. Emily Rodriguez",
    date: "2024-01-03",
    category: "Pet Owners",
    readTime: "9 min read",
    featured: false
  },
  {
    id: 7,
    slug: "commercial-vs-residential-filters",
    title: "Commercial vs. Residential Air Filters: Understanding the Differences",
    excerpt: "Commercial and residential air filters serve different needs. Learn which specifications matter for your specific application.",
    author: "Mike Chen",
    date: "2023-12-28",
    category: "Commercial",
    readTime: "11 min read",
    featured: false
  },
  {
    id: 8,
    slug: "diy-filter-installation-guide",
    title: "DIY Filter Installation: Step-by-Step Guide with Common Mistakes to Avoid",
    excerpt: "Installing air filters seems simple, but small mistakes can reduce effectiveness. Follow our guide for perfect installation every time.",
    author: "Sarah Johnson",
    date: "2023-12-25",
    category: "DIY Guide",
    readTime: "5 min read",
    featured: false
  },
  // Additional Education posts
  {
    id: 9,
    slug: "air-quality-basics-beginners",
    title: "Air Quality Basics: A Beginner's Guide to Understanding Indoor Air",
    excerpt: "Learn the fundamentals of indoor air quality, common pollutants, and how proper filtration can transform your home environment.",
    author: "Dr. Emily Rodriguez",
    date: "2024-01-20",
    category: "Education",
    readTime: "6 min read",
    featured: false
  },
  {
    id: 10,
    slug: "understanding-hepa-technology",
    title: "Understanding HEPA Technology: Science Behind High-Efficiency Filtration",
    excerpt: "Dive deep into HEPA filter technology, learn how these filters achieve 99.97% efficiency, and discover when they're worth the investment.",
    author: "Sarah Johnson",
    date: "2024-01-18",
    category: "Education",
    readTime: "9 min read",
    featured: false
  },
  {
    id: 11,
    slug: "mold-spores-air-filtration",
    title: "Mold Spores and Air Filtration: What Every Homeowner Should Know",
    excerpt: "Understand how mold spores travel through your HVAC system and which filter types provide the best protection against airborne mold.",
    author: "Dr. Emily Rodriguez",
    date: "2024-01-16",
    category: "Education",
    readTime: "8 min read",
    featured: false
  },
  {
    id: 12,
    slug: "hvac-efficiency-filter-relationship",
    title: "The Relationship Between HVAC Efficiency and Filter Selection",
    excerpt: "Discover how your filter choice directly impacts HVAC performance, energy consumption, and long-term system health.",
    author: "Mike Chen",
    date: "2024-01-14",
    category: "Education",
    readTime: "7 min read",
    featured: false
  },
  {
    id: 13,
    slug: "electrostatic-filters-explained",
    title: "Electrostatic Filters Explained: Washable vs. Disposable Options",
    excerpt: "Compare electrostatic filter technologies, understand their benefits and limitations, and learn proper maintenance techniques.",
    author: "Sarah Johnson",
    date: "2024-01-11",
    category: "Education",
    readTime: "10 min read",
    featured: false
  },
  {
    id: 14,
    slug: "carbon-filters-odor-control",
    title: "Carbon Filters and Odor Control: When and Why You Need Them",
    excerpt: "Learn about activated carbon filtration, how it eliminates odors and gases, and when to incorporate it into your air cleaning strategy.",
    author: "Dr. Emily Rodriguez",
    date: "2024-01-09",
    category: "Education",
    readTime: "6 min read",
    featured: false
  },
  {
    id: 15,
    slug: "fiberglass-vs-pleated-filters",
    title: "Fiberglass vs. Pleated Filters: Making the Right Choice for Your Home",
    excerpt: "Compare the two most common filter types, understand their performance differences, and choose the best option for your needs.",
    author: "Mike Chen",
    date: "2024-01-07",
    category: "Education",
    readTime: "8 min read",
    featured: false
  },
  {
    id: 16,
    slug: "air-pressure-filter-impact",
    title: "Air Pressure and Filter Impact: Balancing Filtration and Airflow",
    excerpt: "Understand how filters affect air pressure in your HVAC system and find the perfect balance between filtration and airflow.",
    author: "Sarah Johnson",
    date: "2024-01-04",
    category: "Education",
    readTime: "7 min read",
    featured: false
  },
  {
    id: 17,
    slug: "ultraviolet-air-purification",
    title: "UV-C Air Purification: Complementing Traditional Filtration",
    excerpt: "Explore how UV-C technology works alongside traditional filters to eliminate bacteria, viruses, and other microorganisms.",
    author: "Dr. Emily Rodriguez",
    date: "2024-01-02",
    category: "Education",
    readTime: "9 min read",
    featured: false
  },
  {
    id: 18,
    slug: "filter-efficiency-testing-standards",
    title: "Filter Efficiency Testing Standards: ASHRAE, ISO, and Beyond",
    excerpt: "Understand the testing standards behind filter ratings and learn how to interpret efficiency claims from manufacturers.",
    author: "Mike Chen",
    date: "2023-12-30",
    category: "Education",
    readTime: "11 min read",
    featured: false
  },
  // Additional Maintenance posts
  {
    id: 19,
    slug: "seasonal-filter-maintenance-schedule",
    title: "Creating the Perfect Seasonal Filter Maintenance Schedule",
    excerpt: "Develop a year-round maintenance routine that keeps your air quality optimal while extending your HVAC system's lifespan.",
    author: "Sarah Johnson",
    date: "2024-01-19",
    category: "Maintenance",
    readTime: "6 min read",
    featured: false
  },
  {
    id: 20,
    slug: "dirty-filter-hvac-damage",
    title: "How Dirty Filters Damage Your HVAC System: Prevention Tips",
    excerpt: "Learn the costly consequences of neglecting filter changes and discover simple maintenance habits that protect your investment.",
    author: "Mike Chen",
    date: "2024-01-17",
    category: "Maintenance",
    readTime: "8 min read",
    featured: false
  },
  {
    id: 21,
    slug: "filter-inspection-checklist",
    title: "Monthly Filter Inspection Checklist: What to Look For",
    excerpt: "Master the art of filter inspection with our comprehensive checklist that helps you catch problems before they become expensive repairs.",
    author: "Dr. Emily Rodriguez",
    date: "2024-01-13",
    category: "Maintenance",
    readTime: "5 min read",
    featured: false
  },
  {
    id: 22,
    slug: "hvac-tune-up-filter-role",
    title: "The Role of Filters in Professional HVAC Tune-Ups",
    excerpt: "Understand what HVAC technicians check during tune-ups and how proper filter maintenance supports professional service intervals.",
    author: "Mike Chen",
    date: "2024-01-06",
    category: "Maintenance",
    readTime: "7 min read",
    featured: false
  },
  {
    id: 23,
    slug: "emergency-filter-situations",
    title: "Emergency Filter Situations: When to Take Immediate Action",
    excerpt: "Identify critical filter problems that require immediate attention and learn emergency procedures to protect your HVAC system.",
    author: "Sarah Johnson",
    date: "2024-01-01",
    category: "Maintenance",
    readTime: "6 min read",
    featured: false
  },
  {
    id: 24,
    slug: "filter-disposal-recycling",
    title: "Proper Filter Disposal and Recycling: Environmental Responsibility",
    excerpt: "Learn environmentally responsible ways to dispose of used filters and discover recycling options in your area.",
    author: "Dr. Emily Rodriguez",
    date: "2023-12-29",
    category: "Maintenance",
    readTime: "4 min read",
    featured: false
  },
  {
    id: 25,
    slug: "multiple-zone-filter-management",
    title: "Managing Filters in Multiple-Zone HVAC Systems",
    excerpt: "Navigate the complexities of multi-zone systems, understand different filter requirements, and develop efficient maintenance routines.",
    author: "Mike Chen",
    date: "2023-12-27",
    category: "Maintenance",
    readTime: "9 min read",
    featured: false
  },
  {
    id: 26,
    slug: "filter-change-tools-supplies",
    title: "Essential Tools and Supplies for DIY Filter Changes",
    excerpt: "Build the perfect toolkit for filter maintenance and learn about helpful accessories that make the job easier and more effective.",
    author: "Sarah Johnson",
    date: "2023-12-24",
    category: "Maintenance",
    readTime: "5 min read",
    featured: false
  },
  {
    id: 27,
    slug: "tracking-filter-performance",
    title: "Tracking Filter Performance: Logs, Apps, and Smart Solutions",
    excerpt: "Discover modern tools and techniques for monitoring filter performance and maintaining detailed maintenance records.",
    author: "Dr. Emily Rodriguez",
    date: "2023-12-22",
    category: "Maintenance",
    readTime: "7 min read",
    featured: false
  },
  {
    id: 28,
    slug: "winter-filter-challenges",
    title: "Winter Filter Challenges: Cold Weather Maintenance Tips",
    excerpt: "Address unique winter challenges including humidity control, static buildup, and cold-weather filter performance issues.",
    author: "Mike Chen",
    date: "2023-12-20",
    category: "Maintenance",
    readTime: "8 min read",
    featured: false
  },
  // Additional Product Guide posts
  {
    id: 29,
    slug: "washable-filter-comparison",
    title: "Washable Filters vs. Disposable: Complete Comparison Guide",
    excerpt: "Compare washable and disposable filters across cost, performance, convenience, and environmental impact to make the best choice.",
    author: "Sarah Johnson",
    date: "2024-01-21",
    category: "Product Guide",
    readTime: "10 min read",
    featured: true
  },
  {
    id: 30,
    slug: "smart-filter-monitors",
    title: "Smart Filter Monitors: Technology That Tracks Your Air Quality",
    excerpt: "Explore the latest smart filter monitoring technology and discover how IoT devices can revolutionize your air quality management.",
    author: "Dr. Emily Rodriguez",
    date: "2024-01-15",
    category: "Product Guide",
    readTime: "8 min read",
    featured: false
  },
  {
    id: 31,
    slug: "premium-filter-brands-review",
    title: "Quality Filter Brands Review: 3M, Honeywell, and More",
    excerpt: "In-depth review of leading filter manufacturers, comparing quality, performance, and value across popular product lines.",
    author: "Mike Chen",
    date: "2024-01-10",
    category: "Product Guide",
    readTime: "12 min read",
    featured: false
  },
  {
    id: 32,
    slug: "custom-filter-sizing",
    title: "Custom Filter Sizing: When Standard Sizes Don't Fit",
    excerpt: "Navigate custom filter requirements, understand sizing tolerances, and find solutions for non-standard HVAC systems.",
    author: "Sarah Johnson",
    date: "2024-01-05",
    category: "Product Guide",
    readTime: "7 min read",
    featured: false
  },
  {
    id: 33,
    slug: "antimicrobial-filter-coatings",
    title: "Antimicrobial Filter Coatings: Science and Benefits",
    excerpt: "Understand antimicrobial treatments, their effectiveness against bacteria and viruses, and when they're worth the extra cost.",
    author: "Dr. Emily Rodriguez",
    date: "2023-12-31",
    category: "Product Guide",
    readTime: "9 min read",
    featured: false
  },
  {
    id: 34,
    slug: "filter-frame-materials",
    title: "Filter Frame Materials: Cardboard vs. Metal vs. Plastic",
    excerpt: "Compare filter frame materials for durability, cost, and performance in different environments and applications.",
    author: "Mike Chen",
    date: "2023-12-26",
    category: "Product Guide",
    readTime: "6 min read",
    featured: false
  },
  {
    id: 35,
    slug: "allergen-specific-filters",
    title: "Allergen-Specific Filters: Targeting Pollen, Dust, and Pet Dander",
    excerpt: "Discover specialized filters designed for specific allergens and learn how to choose the right solution for your sensitivities.",
    author: "Dr. Emily Rodriguez",
    date: "2023-12-23",
    category: "Product Guide",
    readTime: "8 min read",
    featured: false
  },
  {
    id: 36,
    slug: "budget-filter-recommendations",
    title: "Best Budget Filter Recommendations That Don't Compromise Quality",
    excerpt: "Find quality filters that won't break the bank with our curated list of budget-friendly options that still deliver performance.",
    author: "Sarah Johnson",
    date: "2023-12-21",
    category: "Product Guide",
    readTime: "7 min read",
    featured: false
  },
  {
    id: 37,
    slug: "high-temperature-filters",
    title: "High-Temperature Filters for Extreme Environments",
    excerpt: "Explore specialized filters designed for high-temperature applications and extreme environmental conditions.",
    author: "Mike Chen",
    date: "2023-12-19",
    category: "Product Guide",
    readTime: "10 min read",
    featured: false
  },
  {
    id: 38,
    slug: "filter-subscription-services",
    title: "Filter Subscription Services: Convenience vs. Cost Analysis",
    excerpt: "Evaluate popular filter subscription services, compare costs, and determine if automatic delivery is right for your household.",
    author: "Sarah Johnson",
    date: "2023-12-17",
    category: "Product Guide",
    readTime: "9 min read",
    featured: false
  },
  // Continue with more posts for other categories...
  // Seasonal Tips posts
  {
    id: 39,
    slug: "summer-humidity-filter-strategy",
    title: "Summer Humidity and Filter Performance: Optimization Strategies",
    excerpt: "Learn how summer humidity affects filter performance and discover strategies to maintain optimal air quality during hot, humid months.",
    author: "Dr. Emily Rodriguez",
    date: "2024-01-22",
    category: "Seasonal Tips",
    readTime: "8 min read",
    featured: false
  },
  {
    id: 40,
    slug: "fall-preparation-filter-checklist",
    title: "Fall HVAC Preparation: Filter and System Checklist",
    excerpt: "Prepare your HVAC system for fall with our comprehensive checklist covering filter changes, system inspection, and winter readiness.",
    author: "Mike Chen",
    date: "2024-01-18",
    category: "Seasonal Tips",
    readTime: "7 min read",
    featured: false
  },
  {
    id: 41,
    slug: "winter-indoor-air-quality",
    title: "Winter Indoor Air Quality: Sealed Home Solutions",
    excerpt: "Address winter air quality challenges when homes are sealed tight and learn filtration strategies for closed-loop environments.",
    author: "Sarah Johnson",
    date: "2024-01-14",
    category: "Seasonal Tips",
    readTime: "9 min read",
    featured: false
  },
  {
    id: 42,
    slug: "wildfire-season-protection",
    title: "Wildfire Season Air Protection: Emergency Filtration Protocols",
    excerpt: "Protect your family during wildfire season with specialized filtration strategies and emergency air quality protocols.",
    author: "Dr. Emily Rodriguez",
    date: "2024-01-09",
    category: "Seasonal Tips",
    readTime: "10 min read",
    featured: false
  },
  {
    id: 43,
    slug: "pollen-calendar-filter-timing",
    title: "Regional Pollen Calendars and Filter Change Timing",
    excerpt: "Use regional pollen data to optimize filter change timing and reduce allergy symptoms throughout the year.",
    author: "Mike Chen",
    date: "2024-01-03",
    category: "Seasonal Tips",
    readTime: "6 min read",
    featured: false
  },
  {
    id: 44,
    slug: "holiday-cooking-air-quality",
    title: "Holiday Cooking and Air Quality: Temporary Filtration Solutions",
    excerpt: "Manage increased cooking activities during holidays with temporary filtration solutions and air quality strategies.",
    author: "Sarah Johnson",
    date: "2023-12-28",
    category: "Seasonal Tips",
    readTime: "5 min read",
    featured: false
  },
  {
    id: 45,
    slug: "construction-season-protection",
    title: "Construction Season Air Protection: Dust and Debris Strategies",
    excerpt: "Protect your home's air quality during nearby construction with specialized filtration and dust control strategies.",
    author: "Dr. Emily Rodriguez",
    date: "2023-12-25",
    category: "Seasonal Tips",
    readTime: "8 min read",
    featured: false
  },
  {
    id: 46,
    slug: "spring-cleaning-air-filters",
    title: "Spring Cleaning Your Air: Filter Replacement and System Refresh",
    excerpt: "Make filter replacement part of your spring cleaning routine with our comprehensive air system refresh guide.",
    author: "Mike Chen",
    date: "2023-12-22",
    category: "Seasonal Tips",
    readTime: "7 min read",
    featured: false
  },
  {
    id: 47,
    slug: "back-to-school-air-prep",
    title: "Back-to-School Air Quality Prep: Family Health Strategies",
    excerpt: "Prepare for back-to-school season with air quality strategies that support family health and reduce illness transmission.",
    author: "Sarah Johnson",
    date: "2023-12-20",
    category: "Seasonal Tips",
    readTime: "6 min read",
    featured: false
  },
  {
    id: 48,
    slug: "seasonal-allergen-tracking",
    title: "Seasonal Allergen Tracking and Filter Response Strategies",
    excerpt: "Track seasonal allergen patterns and adjust your filtration strategy to stay ahead of allergy triggers year-round.",
    author: "Dr. Emily Rodriguez",
    date: "2023-12-18",
    category: "Seasonal Tips",
    readTime: "9 min read",
    featured: false
  },
  // Additional Cost Analysis posts
  {
    id: 49,
    slug: "filter-roi-calculation",
    title: "Calculating ROI on Quality Air Filters: A Financial Analysis",
    excerpt: "Learn how to calculate the return on investment for quality air filters by considering energy savings, health benefits, and system longevity.",
    author: "David Park",
    date: "2024-01-23",
    category: "Cost Analysis",
    readTime: "10 min read",
    featured: false
  },
  {
    id: 50,
    slug: "bulk-buying-filter-savings",
    title: "Bulk Buying Air Filters: Maximizing Savings Without Waste",
    excerpt: "Discover the optimal bulk purchasing strategies for air filters that maximize savings while ensuring freshness and performance.",
    author: "Sarah Johnson",
    date: "2024-01-17",
    category: "Cost Analysis",
    readTime: "8 min read",
    featured: false
  },
  {
    id: 51,
    slug: "energy-costs-filter-efficiency",
    title: "Energy Costs and Filter Efficiency: The Hidden Connection",
    excerpt: "Understand how filter efficiency directly impacts your energy bills and learn to balance filtration with operating costs.",
    author: "Mike Chen",
    date: "2024-01-12",
    category: "Cost Analysis",
    readTime: "9 min read",
    featured: false
  },
  {
    id: 52,
    slug: "maintenance-cost-comparison",
    title: "HVAC Maintenance Cost Comparison: Quality vs. Budget Filters",
    excerpt: "Compare long-term maintenance costs between quality and budget filters to make informed financial decisions.",
    author: "Dr. Emily Rodriguez",
    date: "2024-01-08",
    category: "Cost Analysis",
    readTime: "11 min read",
    featured: false
  },
  {
    id: 53,
    slug: "health-costs-poor-air-quality",
    title: "The Health Cost of Poor Air Quality: Medical Expenses Analysis",
    excerpt: "Analyze the hidden health costs of poor indoor air quality and how proper filtration can reduce medical expenses.",
    author: "David Park",
    date: "2024-01-04",
    category: "Cost Analysis",
    readTime: "12 min read",
    featured: false
  },
  {
    id: 54,
    slug: "hvac-replacement-filter-impact",
    title: "HVAC Replacement Costs: How Filter Choices Affect System Lifespan",
    excerpt: "Learn how your filter choices can extend or shorten HVAC system life and impact replacement costs.",
    author: "Mike Chen",
    date: "2023-12-30",
    category: "Cost Analysis",
    readTime: "10 min read",
    featured: false
  },
  {
    id: 55,
    slug: "workplace-productivity-air-quality",
    title: "Workplace Productivity and Air Quality: The Business Case",
    excerpt: "Examine the business case for improved air quality through better filtration and its impact on productivity and profits.",
    author: "Dr. Emily Rodriguez",
    date: "2023-12-26",
    category: "Cost Analysis",
    readTime: "9 min read",
    featured: false
  },
  {
    id: 56,
    slug: "insurance-claims-air-quality",
    title: "Insurance Claims and Air Quality: Protection Through Prevention",
    excerpt: "Understand how proper air filtration can reduce insurance claims and potentially lower premiums.",
    author: "David Park",
    date: "2023-12-23",
    category: "Cost Analysis",
    readTime: "8 min read",
    featured: false
  },
  {
    id: 57,
    slug: "resale-value-air-quality",
    title: "Home Resale Value and Air Quality Systems: Investment Returns",
    excerpt: "Discover how investing in quality air filtration systems can increase your home's resale value and appeal to buyers.",
    author: "Sarah Johnson",
    date: "2023-12-21",
    category: "Cost Analysis",
    readTime: "7 min read",
    featured: false
  },
  {
    id: 58,
    slug: "lifecycle-cost-analysis",
    title: "Complete Lifecycle Cost Analysis of Air Filtration Systems",
    excerpt: "Perform a comprehensive lifecycle cost analysis to understand the true cost of ownership for different filtration systems.",
    author: "Mike Chen",
    date: "2023-12-19",
    category: "Cost Analysis",
    readTime: "13 min read",
    featured: false
  },
  // Additional Pet Owners posts
  {
    id: 59,
    slug: "multi-pet-household-strategies",
    title: "Multi-Pet Household Air Quality: Advanced Filtration Strategies",
    excerpt: "Manage air quality challenges in homes with multiple pets using specialized filtration techniques and maintenance schedules.",
    author: "Dr. Emily Rodriguez",
    date: "2024-01-24",
    category: "Pet Owners",
    readTime: "9 min read",
    featured: false
  },
  {
    id: 60,
    slug: "cat-vs-dog-dander",
    title: "Cat vs. Dog Dander: Different Challenges, Different Solutions",
    excerpt: "Understand the unique air quality challenges posed by cats versus dogs and tailor your filtration strategy accordingly.",
    author: "Sarah Johnson",
    date: "2024-01-19",
    category: "Pet Owners",
    readTime: "7 min read",
    featured: false
  },
  {
    id: 61,
    slug: "bird-owner-air-quality",
    title: "Bird Owners Air Quality Guide: Feathers, Dust, and Filtration",
    excerpt: "Address the unique air quality challenges of bird ownership including feather dust and proper ventilation strategies.",
    author: "Dr. Emily Rodriguez",
    date: "2024-01-15",
    category: "Pet Owners",
    readTime: "8 min read",
    featured: false
  },
  {
    id: 62,
    slug: "pet-grooming-air-quality",
    title: "Pet Grooming and Indoor Air Quality: Timing and Filtration",
    excerpt: "Learn how to time pet grooming activities with your air filtration system for optimal indoor air quality.",
    author: "Mike Chen",
    date: "2024-01-11",
    category: "Pet Owners",
    readTime: "6 min read",
    featured: false
  },
  {
    id: 63,
    slug: "pet-allergies-family-solutions",
    title: "Pet Allergies in the Family: Balancing Love and Health",
    excerpt: "Navigate the challenge of pet allergies within the family using advanced filtration and air quality management.",
    author: "Dr. Emily Rodriguez",
    date: "2024-01-06",
    category: "Pet Owners",
    readTime: "10 min read",
    featured: false
  },
  {
    id: 64,
    slug: "exotic-pets-air-quality",
    title: "Exotic Pets and Air Quality: Reptiles, Amphibians, and More",
    excerpt: "Address air quality considerations for exotic pet owners including humidity control and specialized filtration needs.",
    author: "Sarah Johnson",
    date: "2024-01-02",
    category: "Pet Owners",
    readTime: "9 min read",
    featured: false
  },
  {
    id: 65,
    slug: "pet-odor-elimination",
    title: "Complete Pet Odor Elimination: Beyond Basic Filtration",
    excerpt: "Go beyond basic filtration with comprehensive strategies for eliminating pet odors and maintaining fresh indoor air.",
    author: "Mike Chen",
    date: "2023-12-29",
    category: "Pet Owners",
    readTime: "8 min read",
    featured: false
  },
  {
    id: 66,
    slug: "shedding-season-preparation",
    title: "Shedding Season Preparation: Maximizing Filter Performance",
    excerpt: "Prepare your filtration system for peak shedding seasons and learn strategies to handle increased pet hair and dander.",
    author: "Dr. Emily Rodriguez",
    date: "2023-12-27",
    category: "Pet Owners",
    readTime: "7 min read",
    featured: false
  },
  {
    id: 67,
    slug: "pet-safe-filter-materials",
    title: "Pet-Safe Filter Materials: Avoiding Harmful Chemicals",
    excerpt: "Ensure your air filters are safe for pets by understanding which materials and treatments to avoid in pet households.",
    author: "Sarah Johnson",
    date: "2023-12-24",
    category: "Pet Owners",
    readTime: "6 min read",
    featured: false
  },
  {
    id: 68,
    slug: "new-pet-air-preparation",
    title: "Bringing Home a New Pet: Air Quality Preparation Checklist",
    excerpt: "Prepare your home's air quality system before bringing home a new pet with this comprehensive preparation guide.",
    author: "Mike Chen",
    date: "2023-12-22",
    category: "Pet Owners",
    readTime: "5 min read",
    featured: false
  },
  // Additional Commercial posts
  {
    id: 69,
    slug: "office-building-air-standards",
    title: "Office Building Air Quality Standards: Compliance and Best Practices",
    excerpt: "Navigate commercial air quality standards and regulations while implementing best practices for office environments.",
    author: "Mike Chen",
    date: "2024-01-25",
    category: "Commercial",
    readTime: "12 min read",
    featured: false
  },
  {
    id: 70,
    slug: "restaurant-kitchen-filtration",
    title: "Restaurant Kitchen Filtration: Grease, Smoke, and Air Quality",
    excerpt: "Address the unique filtration challenges of commercial kitchens including grease capture and smoke management.",
    author: "Dr. Emily Rodriguez",
    date: "2024-01-20",
    category: "Commercial",
    readTime: "10 min read",
    featured: false
  },
  {
    id: 71,
    slug: "healthcare-facility-standards",
    title: "Healthcare Facility Air Standards: Critical Filtration Requirements",
    excerpt: "Understand the critical air filtration requirements for healthcare facilities and the importance of maintaining sterile environments.",
    author: "Sarah Johnson",
    date: "2024-01-16",
    category: "Commercial",
    readTime: "11 min read",
    featured: false
  },
  {
    id: 72,
    slug: "manufacturing-air-quality",
    title: "Manufacturing Air Quality: Industrial Filtration Solutions",
    excerpt: "Explore industrial-grade filtration solutions for manufacturing environments and worker safety considerations.",
    author: "Mike Chen",
    date: "2024-01-13",
    category: "Commercial",
    readTime: "9 min read",
    featured: false
  },
  {
    id: 73,
    slug: "school-classroom-air-quality",
    title: "School Classroom Air Quality: Student Health and Performance",
    excerpt: "Examine the impact of classroom air quality on student health and academic performance with practical improvement strategies.",
    author: "Dr. Emily Rodriguez",
    date: "2024-01-07",
    category: "Commercial",
    readTime: "8 min read",
    featured: false
  },
  {
    id: 74,
    slug: "retail-space-air-management",
    title: "Retail Space Air Management: Customer Comfort and Sales",
    excerpt: "Learn how proper air quality management in retail spaces can improve customer comfort and potentially increase sales.",
    author: "Sarah Johnson",
    date: "2024-01-01",
    category: "Commercial",
    readTime: "7 min read",
    featured: false
  },
  {
    id: 75,
    slug: "warehouse-dust-control",
    title: "Warehouse Dust Control: Large-Scale Filtration Strategies",
    excerpt: "Implement effective dust control strategies in warehouse environments using large-scale filtration systems.",
    author: "Mike Chen",
    date: "2023-12-31",
    category: "Commercial",
    readTime: "10 min read",
    featured: false
  },
  {
    id: 76,
    slug: "hotel-guest-comfort",
    title: "Hotel Air Quality: Guest Comfort and Satisfaction Standards",
    excerpt: "Maintain high air quality standards in hotels to ensure guest comfort and satisfaction while managing operating costs.",
    author: "Dr. Emily Rodriguez",
    date: "2023-12-28",
    category: "Commercial",
    readTime: "9 min read",
    featured: false
  },
  {
    id: 77,
    slug: "laboratory-clean-room-standards",
    title: "Laboratory Clean Room Standards: Precision Filtration Requirements",
    excerpt: "Understand the precise filtration requirements for laboratory clean rooms and maintaining contamination-free environments.",
    author: "Sarah Johnson",
    date: "2023-12-25",
    category: "Commercial",
    readTime: "13 min read",
    featured: false
  },
  {
    id: 78,
    slug: "commercial-hvac-maintenance",
    title: "Commercial HVAC Maintenance: Large-Scale Filter Management",
    excerpt: "Develop efficient maintenance protocols for large-scale commercial HVAC systems and filter management programs.",
    author: "Mike Chen",
    date: "2023-12-23",
    category: "Commercial",
    readTime: "11 min read",
    featured: false
  },
  // Additional DIY Guide posts
  {
    id: 79,
    slug: "filter-measurement-guide",
    title: "DIY Filter Measurement: Getting the Perfect Fit Every Time",
    excerpt: "Master the art of measuring air filter dimensions to ensure perfect fit and optimal performance in any HVAC system.",
    author: "Sarah Johnson",
    date: "2024-01-26",
    category: "DIY Guide",
    readTime: "6 min read",
    featured: false
  },
  {
    id: 80,
    slug: "temporary-filter-solutions",
    title: "Emergency DIY Filter Solutions: When You Can't Get to the Store",
    excerpt: "Learn safe, temporary filter solutions for emergency situations when replacement filters aren't immediately available.",
    author: "Mike Chen",
    date: "2024-01-21",
    category: "DIY Guide",
    readTime: "5 min read",
    featured: false
  },
  {
    id: 81,
    slug: "custom-filter-frames",
    title: "Building Custom Filter Frames: Advanced DIY Techniques",
    excerpt: "Create custom filter frames for non-standard HVAC systems using basic tools and materials available at hardware stores.",
    author: "Dr. Emily Rodriguez",
    date: "2024-01-18",
    category: "DIY Guide",
    readTime: "9 min read",
    featured: false
  },
  {
    id: 82,
    slug: "filter-airflow-testing",
    title: "DIY Airflow Testing: Ensuring Proper Filter Performance",
    excerpt: "Test your air filter's impact on system airflow using simple DIY methods and basic measuring tools.",
    author: "Sarah Johnson",
    date: "2024-01-14",
    category: "DIY Guide",
    readTime: "7 min read",
    featured: false
  },
  {
    id: 83,
    slug: "washable-filter-maintenance",
    title: "Washable Filter Maintenance: Complete DIY Care Guide",
    excerpt: "Master the proper cleaning and maintenance of washable filters to maximize their lifespan and effectiveness.",
    author: "Mike Chen",
    date: "2024-01-09",
    category: "DIY Guide",
    readTime: "8 min read",
    featured: false
  },
  {
    id: 84,
    slug: "multi-stage-filter-setup",
    title: "DIY Multi-Stage Filter Setup: Layered Protection Strategy",
    excerpt: "Create a multi-stage filtration system using standard components for enhanced air cleaning performance.",
    author: "Dr. Emily Rodriguez",
    date: "2024-01-05",
    category: "DIY Guide",
    readTime: "10 min read",
    featured: false
  },
  {
    id: 85,
    slug: "troubleshooting-filter-problems",
    title: "Troubleshooting Common Filter Problems: DIY Diagnostics",
    excerpt: "Diagnose and solve common air filter problems using simple troubleshooting techniques and basic tools.",
    author: "Sarah Johnson",
    date: "2023-12-30",
    category: "DIY Guide",
    readTime: "6 min read",
    featured: false
  },
  {
    id: 86,
    slug: "diy-air-quality-monitoring",
    title: "DIY Air Quality Monitoring: Track Your Filter's Performance",
    excerpt: "Set up simple air quality monitoring systems to track your filter's performance and indoor air improvements.",
    author: "Mike Chen",
    date: "2023-12-26",
    category: "DIY Guide",
    readTime: "8 min read",
    featured: false
  },
  {
    id: 87,
    slug: "filter-sealing-techniques",
    title: "Professional Filter Sealing Techniques: Stop Air Bypass",
    excerpt: "Learn professional techniques for sealing filters properly to prevent air bypass and maximize filtration efficiency.",
    author: "Dr. Emily Rodriguez",
    date: "2023-12-24",
    category: "DIY Guide",
    readTime: "7 min read",
    featured: false
  },
  {
    id: 88,
    slug: "seasonal-filter-storage",
    title: "Seasonal Filter Storage: Preserving Quality and Performance",
    excerpt: "Properly store seasonal filters and backup supplies to maintain their quality and performance over time.",
    author: "Sarah Johnson",
    date: "2023-12-21",
    category: "DIY Guide",
    readTime: "5 min read",
    featured: false
  }
];

const categories = [
  "All Posts",
  "Education", 
  "Maintenance", 
  "Product Guide", 
  "Seasonal Tips", 
  "Cost Analysis", 
  "Pet Owners", 
  "Commercial", 
  "DIY Guide"
];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Posts");

  const filteredPosts = selectedCategory === "All Posts" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredFilteredPosts = filteredPosts.filter(post => post.featured);
  const recentFilteredPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-section-fluid-lg bg-gradient-subtle">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-12 h-1 bg-accent rounded-full" />
              <span className="text-primary font-medium">AirCare Blog</span>
              <div className="w-12 h-1 bg-accent rounded-full" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Air Quality
              <span className="text-primary block">Insights & Tips</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Expert advice, maintenance tips, and industry insights to help you make 
              informed decisions about your indoor air quality and filtration needs.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-fluid-sm bg-background border-b">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="px-4 py-2 cursor-pointer hover:bg-muted transition-colors"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredFilteredPosts.length > 0 && (
        <section className="py-section-fluid-md bg-background">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Featured Articles</h2>
              <Badge className="bg-primary text-primary-foreground">Editor's Choice</Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredFilteredPosts.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`} className="block">
                  <Card className="bg-card hover:shadow-lg hover:scale-105 transform-gpu transition-all duration-300 ease-out cursor-pointer group overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Badge variant="outline" className="text-xs">
                          {post.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{post.readTime}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <CalendarDays className="w-4 h-4" />
                            <span>{new Date(post.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section className="py-section-fluid-md bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
            {featuredFilteredPosts.length > 0 ? "Recent Articles" : "All Articles"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentFilteredPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="block">
                <Card className="bg-card hover:shadow-lg hover:scale-105 transform-gpu transition-all duration-300 ease-out cursor-pointer group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Badge variant="outline" className="text-xs">
                        {post.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{post.readTime}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-section-fluid-md bg-background">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get the latest air quality tips, product updates, and exclusive offers 
              delivered straight to your inbox.
            </p>
            
            <Card className="bg-card">
              <CardContent className="p-8">
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                    Subscribe
                  </button>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  No spam, unsubscribe at any time. We respect your privacy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;