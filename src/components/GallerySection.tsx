import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const galleryImages = [
  {
    src: "/lovable-uploads/d03369d3-b96c-4797-af10-cbeeaf358383.png",
    alt: "Joe's Auto Repair shop interior with luxury vehicles including Maserati",
    title: "Luxury Vehicle Specialists"
  },
  {
    src: "/lovable-uploads/4cabc746-eb6c-4d0c-8b82-8b1ce5265c07.png",
    alt: "Professional service bay with Mercedes and luxury cars",
    title: "Premium Service Bays"
  },
  {
    src: "/lovable-uploads/8cf885c5-a29a-45a5-8245-37f5bad7b150.png",
    alt: "Maserati on hydraulic lift in professional auto shop",
    title: "Expert Hydraulic Service"
  },
  {
    src: "/lovable-uploads/b9bbb5c0-12fc-4d3b-a636-0306559ae52b.png",
    alt: "Technician working on Bentley with professional equipment",
    title: "Bentley & Luxury Car Specialists"
  },
  {
    src: "/lovable-uploads/100c0add-6958-48f8-af23-8ed289b4637d.png",
    alt: "Exterior view with multiple BMW vehicles parked outside",
    title: "BMW Specialist Services"
  },
  {
    src: "/lovable-uploads/e970c1f1-4577-4016-a07d-6296c0409076.png",
    alt: "Joe's Auto Repair shop exterior with diverse luxury vehicles",
    title: "Our Professional Facility"
  },
  {
    src: "/lovable-uploads/e8fef3c4-3652-4cb3-9d6f-998e838bb279.png",
    alt: "Comfortable customer waiting area with modern furniture",
    title: "Customer Comfort Area"
  },
  {
    src: "/lovable-uploads/9c71c1d0-cb48-4281-8bbf-35753a3e27bb.png",
    alt: "Full service bay with luxury vehicles and professional equipment",
    title: "State-of-the-Art Equipment"
  },
  {
    src: "/lovable-uploads/fd02e577-011f-4e3a-8229-e63235d722c5.png",
    alt: "BMW engine bay showing precision automotive engineering",
    title: "Expert Engine Diagnostics"
  }
];

const GallerySection = () => {
  return (
    <section id="gallery" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Facility
          </h2>
          <p className="text-lg text-muted-foreground">
            Take a look at our modern, professional auto repair facility
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {galleryImages.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 mx-2">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-64 md:h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-lg font-semibold">{image.title}</h3>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Ready to experience our professional service? Contact us today to schedule your appointment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;