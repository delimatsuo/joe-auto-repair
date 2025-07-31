import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    rating: 5,
    text: "Very honest and did excellent work for a fraction of what the dealership wanted on my BMW X5. Joe's expertise with luxury vehicles is unmatched in the area."
  },
  {
    name: "Michael T.",
    rating: 5,
    text: "Always amazing service. I wouldn't trust anyone else. Honest and reliable—can't ask for anything else. Joe has been taking care of my family's cars for years."
  },
  {
    name: "Jennifer L.",
    rating: 5,
    text: "Joe and his team are extremely knowledgeable, respectful, courteous, and genuinely care about you and your car. The level of service is exceptional."
  },
  {
    name: "David R.",
    rating: 5,
    text: "Outstanding service. Very professional—highly recommended! They diagnosed my engine problem quickly and fixed it right the first time."
  },
  {
    name: "Lisa K.",
    rating: 5,
    text: "Fair pricing, excellent work, and great communication throughout the process. Joe explains everything clearly and never tries to sell you unnecessary services."
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <section id="reviews" className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <Card className="min-h-[250px]">
              <CardContent className="p-8">
                <div className="text-center">
                  <Quote className="h-12 w-12 text-primary mx-auto mb-6 opacity-50" />
                  
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-warning fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-lg md:text-xl text-foreground mb-6 font-medium leading-relaxed">
                    "{testimonials[currentIndex].text}"
                  </blockquote>
                  
                  <cite className="text-primary font-semibold">
                    — {testimonials[currentIndex].name}
                  </cite>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="sm"
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;