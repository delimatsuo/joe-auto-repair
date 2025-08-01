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
              Meet Joe - Your Local Auto Expert
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              20+ years of trust, expertise, and honest service in Rochdale, MA
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Joe's Photo */}
            <div className="order-2 lg:order-1">
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

            <div className="space-y-6 order-1 lg:order-2">
              <h3 className="text-3xl font-bold mb-6 text-foreground">
                Built on Trust, Driven by Excellence
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                With over 20 years of experience in automotive repair, Joe has built his reputation 
                on honest service and professional results. Starting as a young mechanic with a 
                passion for problem-solving, Joe opened his shop in Rochdale with one mission: 
                to provide transparent, reliable auto repair services to his community.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Today, Joe leads a skilled team of expert technicians who share his commitment to 
                excellence. Together, they specialize in BMW, Audi, and Land Rover repair, while 
                welcoming all makes and models. Their dedication to ongoing education and the latest 
                diagnostic equipment ensures every vehicle receives the best care possible.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="inline-flex items-center gap-2 bg-success/10 border border-success/20 rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-success font-semibold text-sm">ASE Certified</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-primary font-semibold text-sm">BMW Specialist</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-warning/10 border border-warning/20 rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  <span className="text-warning-foreground font-semibold text-sm">LGBTQ+ Friendly</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="group text-center p-8 bg-card rounded-2xl shadow-depth hover:shadow-automotive transition-all duration-300 hover:-translate-y-2">
                <div className="mx-auto mb-6 p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl w-fit group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                  <Clock className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">20+</div>
                <div className="text-muted-foreground">Years Experience</div>
              </div>
              
              <div className="group text-center p-8 bg-card rounded-2xl shadow-depth hover:shadow-automotive transition-all duration-300 hover:-translate-y-2">
                <div className="mx-auto mb-6 p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl w-fit group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                  <Users className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">1000+</div>
                <div className="text-muted-foreground">Happy Customers</div>
              </div>
              
              <div className="group text-center p-8 bg-card rounded-2xl shadow-depth hover:shadow-automotive transition-all duration-300 hover:-translate-y-2">
                <div className="mx-auto mb-6 p-4 bg-gradient-to-br from-warning/10 to-warning/5 rounded-xl w-fit group-hover:from-warning/20 group-hover:to-warning/10 transition-all duration-300">
                  <div className="flex justify-center">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-6 w-6 text-warning fill-current group-hover:scale-110 transition-transform" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-3xl font-bold text-primary mb-2">5.0★</div>
                <div className="text-muted-foreground mb-3">Google Rating</div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(googleReviewsUrl, '_blank')}
                  className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Read Reviews
                </Button>
              </div>
              
              <div className="group text-center p-8 bg-card rounded-2xl shadow-depth hover:shadow-automotive transition-all duration-300 hover:-translate-y-2">
                <div className="mx-auto mb-6 p-4 bg-gradient-to-br from-success/10 to-success/5 rounded-xl w-fit group-hover:from-success/20 group-hover:to-success/10 transition-all duration-300">
                  <CheckCircle className="h-8 w-8 text-success group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;