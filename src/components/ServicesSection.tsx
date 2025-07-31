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
    icon: Gauge,
    title: "Oil Changes & Maintenance",
    description: "Regular maintenance to keep your vehicle running smoothly",
    features: ["Full synthetic & conventional oil", "Filter replacement", "Multi-point inspection"]
  },
  {
    icon: Zap,
    title: "Brake Service & Repair",
    description: "Complete brake system inspection and repair services",
    features: ["Brake pad replacement", "Rotor resurfacing", "Brake fluid service"]
  },
  {
    icon: Settings,
    title: "Engine Repair & Diagnostics",
    description: "Advanced diagnostic and repair for all engine issues",
    features: ["Computer diagnostics", "Engine rebuilds", "Performance tuning"]
  },
  {
    icon: Car,
    title: "Tire & Wheel Service",
    description: "Complete tire services and wheel alignment",
    features: ["Tire installation", "Wheel balancing", "Alignment service"]
  },
  {
    icon: Battery,
    title: "Battery & Electrical",
    description: "Electrical system diagnosis and battery replacement",
    features: ["Battery testing", "Alternator service", "Starter repair"]
  },
  {
    icon: Wrench,
    title: "BMW & Luxury Specialist",
    description: "Specialized service for BMW and luxury vehicles",
    features: ["Factory-trained expertise", "OEM parts", "Advanced diagnostics"]
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From routine maintenance to complex repairs, we provide comprehensive 
            automotive services you can trust.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-success mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button variant="hero" size="lg">
            Schedule Your Service Today
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;