import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Phone, MapPin, Star, Wrench, Shield, Award } from "lucide-react";

const QuickActionsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Quick Actions Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Schedule Service */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/30">
            <CardContent className="p-8 text-center">
              <div className="mx-auto mb-6 p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl w-fit group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                <Calendar className="h-10 w-10 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Schedule Service</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Book your appointment online or call us directly. We offer flexible scheduling to fit your busy life.
              </p>
              <Button 
                className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-bold py-3"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Book Appointment
              </Button>
            </CardContent>
          </Card>

          {/* Emergency Service */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-warning/30">
            <CardContent className="p-8 text-center">
              <div className="mx-auto mb-6 p-4 bg-gradient-to-br from-warning/10 to-warning/5 rounded-xl w-fit group-hover:from-warning/20 group-hover:to-warning/10 transition-all duration-300">
                <Phone className="h-10 w-10 text-warning group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Emergency Service</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Car trouble? Call us now for immediate assistance. We're here when you need us most.
              </p>
              <Button 
                className="w-full bg-warning hover:bg-warning/90 text-warning-foreground font-bold py-3"
                onClick={() => window.open('tel:+17726185558', '_self')}
              >
                Call (772) 618-5558
              </Button>
            </CardContent>
          </Card>

          {/* Get Directions */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-success/30">
            <CardContent className="p-8 text-center">
              <div className="mx-auto mb-6 p-4 bg-gradient-to-br from-success/10 to-success/5 rounded-xl w-fit group-hover:from-success/20 group-hover:to-success/10 transition-all duration-300">
                <MapPin className="h-10 w-10 text-success group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Visit Our Shop</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Find us easily with GPS directions. Located in the heart of Rochdale for your convenience.
              </p>
              <Button 
                variant="outline"
                className="w-full border-success text-success hover:bg-success hover:text-success-foreground font-bold py-3"
                onClick={() => window.open('https://maps.google.com/?q=123+Main+St,+Rochdale,+MA', '_blank')}
              >
                Get Directions
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Trust Indicators Row */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary mb-2">ASE</div>
            <div className="text-muted-foreground font-medium">Certified Technicians</div>
          </div>
          
          <div className="text-center">
            <div className="mx-auto mb-4 p-3 bg-warning/10 rounded-full w-fit">
              <Star className="h-8 w-8 text-warning fill-current" />
            </div>
            <div className="text-2xl font-bold text-warning mb-2">5.0★</div>
            <div className="text-muted-foreground font-medium">Customer Rating</div>
          </div>
          
          <div className="text-center">
            <div className="mx-auto mb-4 p-3 bg-success/10 rounded-full w-fit">
              <Wrench className="h-8 w-8 text-success" />
            </div>
            <div className="text-2xl font-bold text-success mb-2">20+</div>
            <div className="text-muted-foreground font-medium">Years Experience</div>
          </div>
          
          <div className="text-center">
            <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-fit">
              <Award className="h-8 w-8 text-accent" />
            </div>
            <div className="text-2xl font-bold text-accent mb-2">1000+</div>
            <div className="text-muted-foreground font-medium">Satisfied Customers</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickActionsSection;