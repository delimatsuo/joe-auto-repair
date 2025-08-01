import bmwImage from "@/assets/bmw-specialist.jpg";
import audiImage from "@/assets/audi-specialist.jpg";
import landroverImage from "@/assets/landrover-specialist.jpg";
import { Card, CardContent } from "@/components/ui/card";

const brands = [
  {
    name: "BMW",
    image: bmwImage,
    alt: "BMW vehicle serviced at Joe's Auto Repair",
    description: "Specialized BMW service and repair with factory-trained technicians"
  },
  {
    name: "Audi", 
    image: audiImage,
    alt: "Audi vehicle serviced at Joe's Auto Repair",
    description: "Expert Audi maintenance and diagnostics using genuine parts"
  },
  {
    name: "Land Rover",
    image: landroverImage, 
    alt: "Land Rover vehicle serviced at Joe's Auto Repair",
    description: "Professional Land Rover service for all models and years"
  }
];

const BrandsSection = () => {
  return (
    <section id="brands" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Brand Specialization
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We specialize in premium European vehicles with expert knowledge and genuine parts
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {brands.map((brand, index) => (
            <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden">
                <img
                  src={brand.image}
                  alt={brand.alt}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{brand.name}</h3>
                    <p className="text-sm text-white/90">{brand.description}</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">{brand.name}</h3>
                <p className="text-muted-foreground text-sm">{brand.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Trust your premium vehicle to our certified specialists
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;