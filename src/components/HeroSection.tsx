import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-shop-exterior.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Enhanced Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Multi-layered overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70"></div>
        <div className="absolute inset-0 automotive-pattern opacity-20"></div>
      </div>
      
      {/* Enhanced Content */}
      <div className="relative z-10 text-center text-white max-w-5xl px-4">
        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 bg-success/20 border border-success/30 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-success font-semibold text-sm">ASE Certified • 20+ Years Experience</span>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="block">Joe's Auto Repair</span>
        </h1>
        
        <div className="text-3xl md:text-4xl font-bold mb-6 automotive-gradient bg-clip-text text-transparent">
          Honest Service. Pro Results.
        </div>
        
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-100">
          Serving Rochdale, MA with trusted automotive repair and maintenance services. 
          From routine oil changes to complex engine repairs, we've got you covered.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="group bg-warning hover:bg-warning/90 text-warning-foreground font-bold text-lg px-8 py-4 rounded-lg shadow-automotive transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <span className="flex items-center gap-2">
              Schedule Service Today
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
          <button className="group bg-white/10 border-2 border-white/30 text-white hover:bg-white hover:text-foreground font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300 backdrop-blur-sm hover:scale-105">
            Get Free Quote
          </button>
        </div>
        
        {/* Bottom trust indicators */}
        <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-warning font-bold">★</span>
            </div>
            <span>5.0 Google Rating</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-success font-bold">✓</span>
            </div>
            <span>BMW Specialist</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-white font-bold">🏆</span>
            </div>
            <span>1000+ Happy Customers</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;