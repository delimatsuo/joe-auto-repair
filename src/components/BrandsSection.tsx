import bentleyImage from "@/assets/bentley-luxury.jpg";
import ferrariImage from "@/assets/ferrari-exotic.jpg";
import lamborghiniImage from "@/assets/lamborghini-supercar.jpg";
import { Card, CardContent } from "@/components/ui/card";

const brands = [
  {
    name: "Bentley",
    image: bentleyImage,
    alt: "Bentley Continental GT at Joe's Auto Repair",
    description: "Factory-trained specialists with European certification and genuine parts expertise"
  },
  {
    name: "Ferrari", 
    image: ferrariImage,
    alt: "Ferrari 488 GTB at Joe's Auto Repair",
    description: "Italian-trained technicians specializing in Ferrari performance and precision service"
  },
  {
    name: "Lamborghini",
    image: lamborghiniImage, 
    alt: "Lamborghini Huracan at Joe's Auto Repair",
    description: "Certified specialists with track-proven expertise in Lamborghini systems"
  }
];

const BrandsSection = () => {
  return (
    <section id="brands" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Luxury Marque Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Exclusive specialization in the world's most prestigious automotive brands
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
            Where automotive artistry meets technical mastery
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;