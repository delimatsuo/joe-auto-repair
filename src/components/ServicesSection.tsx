import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Wrench, 
  Gauge, 
  Battery, 
  Zap, 
  Car, 
  Settings,
  CheckCircle
} from "lucide-react";

const services = [
  {
    icon: Settings,
    title: "Precision Engine Diagnostics",
    description: "Advanced computer diagnostics for complex luxury powertrains",
    features: ["Factory-level scan tools", "ECU programming", "Performance optimization"]
  },
  {
    icon: Zap,
    title: "Exotic Brake Systems",
    description: "Carbon ceramic and high-performance brake service",
    features: ["Carbon ceramic service", "Brembo system expertise", "Track-ready upgrades"]
  },
  {
    icon: Gauge,
    title: "Luxury Maintenance Programs",
    description: "Comprehensive maintenance following factory specifications",
    features: ["Exotic oil formulations", "OEM filter systems", "Precision calibration"]
  },
  {
    icon: Car,
    title: "Suspension & Handling",
    description: "Adaptive suspension and performance handling systems",
    features: ["Air suspension repair", "Magnetic ride control", "Track alignment"]
  },
  {
    icon: Battery,
    title: "Advanced Electronics",
    description: "Complex electrical systems and hybrid technology",
    features: ["Infotainment diagnostics", "Hybrid system service", "Custom programming"]
  },
  {
    icon: Wrench,
    title: "Concierge Service",
    description: "White-glove pickup, delivery, and storage services",
    features: ["Climate-controlled storage", "Collection transport", "Emergency service"]
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Luxury Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Specialized service programs designed exclusively for Bentley, Ferrari, 
            and Lamborghini vehicles with uncompromising attention to detail.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="group hover:shadow-depth transition-all duration-300 hover:-translate-y-2 border-0 shadow-md bg-gradient-to-br from-card to-muted/30">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl w-fit group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300 shadow-inner">
                    <IconComponent className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">{service.title}</CardTitle>
                  <CardDescription className="text-muted-foreground group-hover:text-foreground/80 transition-colors">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm group-hover:text-foreground transition-colors">
                        <div className="mr-3 p-1 bg-success/10 rounded-full">
                          <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                        </div>
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 shadow-depth">
          <h3 className="text-2xl font-bold mb-4">Experience Luxury Service Excellence</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Your exotic automobile deserves nothing less than perfection. Schedule your luxury service appointment today.
          </p>
          <button 
            className="bg-primary hover:bg-primary-hover text-primary-foreground font-bold text-lg px-8 py-4 rounded-lg shadow-automotive transition-all duration-300 hover:scale-105"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Schedule Your Service Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;