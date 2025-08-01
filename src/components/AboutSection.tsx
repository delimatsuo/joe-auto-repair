import { Badge } from "@/components/ui/badge";
import { CheckCircle, Award, Users, Clock, ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutSection = () => {
  const googleReviewsUrl = "https://www.google.com/maps/place/Joe's+Auto+Repair/@42.2103669,-71.9067418,17z/data=!4m8!3m7!1s0x89e406ebaee3a815:0xf71bf5d0866f54bc!8m2!3d42.2103722!4d-71.9067439!9m1!1b1!16s%2Fg%2F11bc8zg_4f";

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-muted/50 to-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 automotive-pattern opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-4">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-primary font-semibold text-sm">About Our Shop</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Meet Joe - Master of Luxury Automobiles
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              25+ years perfecting the art of Bentley, Ferrari, and Lamborghini service
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
            {/* Content Column */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold mb-6 text-foreground">
                  Crafted for Perfection, Built on Precision
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  For over 25 years, Joe has dedicated his career to mastering the intricate engineering 
                  of the world's most prestigious automobiles. What began as a passion for exotic machinery 
                  evolved into an exclusive specialty workshop focused solely on Bentley, Ferrari, and 
                  Lamborghini vehicles.
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Joe's team consists of factory-certified master technicians who undergo continuous 
                  specialized training at European facilities. Each craftsman brings decades of experience 
                  working exclusively with these ultra-luxury marques, ensuring your investment receives 
                  the meticulous care it deserves.
                </p>
                
                <div className="flex flex-wrap gap-3">
                  <div className="inline-flex items-center gap-2 bg-success/10 border border-success/20 rounded-full px-4 py-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-success font-semibold text-sm">Factory Certified</span>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-primary font-semibold text-sm">Luxury Specialist</span>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-warning/10 border border-warning/20 rounded-full px-4 py-2">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <span className="text-warning-foreground font-semibold text-sm">Concierge Service</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Joe's Photo */}
            <div>
              <div className="relative">
                <img
                  src="/lovable-uploads/5c926083-944b-4989-a747-4f5b6179b713.png"
                  alt="Joe standing proudly next to a Lamborghini at his auto repair shop"
                  className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-automotive"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Meet Joe</h3>
                  <p className="text-white/90">Passionate about excellence in automotive care</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid - Full Width Below */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group text-center p-6 bg-card rounded-2xl shadow-depth hover:shadow-automotive transition-all duration-300 hover:-translate-y-2">
              <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl w-fit group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                <Clock className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">25+</div>
              <div className="text-sm text-muted-foreground">Years Luxury Experience</div>
            </div>
            
            <div className="group text-center p-6 bg-card rounded-2xl shadow-depth hover:shadow-automotive transition-all duration-300 hover:-translate-y-2">
              <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl w-fit group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                <Users className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">500+</div>
              <div className="text-sm text-muted-foreground">Luxury Vehicles Serviced</div>
            </div>
            
            <div className="group text-center p-6 bg-card rounded-2xl shadow-depth hover:shadow-automotive transition-all duration-300 hover:-translate-y-2">
              <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-warning/10 to-warning/5 rounded-xl w-fit group-hover:from-warning/20 group-hover:to-warning/10 transition-all duration-300">
                <div className="flex justify-center">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-warning fill-current group-hover:scale-110 transition-transform" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">5.0★</div>
              <div className="text-sm text-muted-foreground mb-2">Google Rating</div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(googleReviewsUrl, '_blank')}
                className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Reviews
              </Button>
            </div>
            
            <div className="group text-center p-6 bg-card rounded-2xl shadow-depth hover:shadow-automotive transition-all duration-300 hover:-translate-y-2">
              <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-success/10 to-success/5 rounded-xl w-fit group-hover:from-success/20 group-hover:to-success/10 transition-all duration-300">
                <CheckCircle className="h-6 w-6 text-success group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;