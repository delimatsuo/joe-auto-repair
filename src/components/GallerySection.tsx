import heroImage from "@/assets/hero-shop-exterior.jpg";
import teamWorking from "@/assets/team-working.jpg";
import shopInterior from "@/assets/shop-interior.jpg";
import waitingArea from "@/assets/waiting-area.jpg";

const galleryImages = [
  {
    src: heroImage,
    alt: "Joe's Auto Repair shop exterior",
    title: "Our Professional Facility"
  },
  {
    src: shopInterior,
    alt: "Modern auto repair shop interior with service bays",
    title: "State-of-the-Art Service Bays"
  },
  {
    src: teamWorking,
    alt: "Professional mechanics working on vehicle",
    title: "Expert Technicians at Work"
  },
  {
    src: waitingArea,
    alt: "Comfortable customer waiting area",
    title: "Comfortable Waiting Area"
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

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-semibold">{image.title}</h3>
                </div>
              </div>
            </div>
          ))}
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