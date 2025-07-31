import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-shop-exterior.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Joe's Auto Repair
        </h1>
        <p className="text-2xl md:text-3xl font-semibold mb-4 text-warning">
          Honest Service. Pro Results.
        </p>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Serving Rochdale, MA with trusted automotive repair and maintenance services. 
          From routine oil changes to complex engine repairs, we've got you covered.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="lg">
            Schedule Service
          </Button>
          <Button variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white hover:text-foreground">
            Get Quote
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;