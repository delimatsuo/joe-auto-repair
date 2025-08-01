import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Enhanced Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(/lovable-uploads/e87abaab-6b88-42ed-8f64-e4fe3b59aeed.png)` }}
      >
        {/* Multi-layered overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/80"></div>
        <div className="absolute inset-0 automotive-pattern opacity-10"></div>
      </div>
      
      {/* Enhanced Content */}
      <div className="relative z-10 text-center text-white max-w-6xl px-4 py-20">
        {/* Trust Badge - More Prominent */}
        <div className="inline-flex items-center gap-3 bg-white/20 border border-white/30 rounded-full px-6 py-3 mb-8 backdrop-blur-sm">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
          <span className="text-white font-bold text-base">ASE Certified • 20+ Years Experience • BMW Specialist</span>
        </div>
        
        {/* Main Headline - Larger and More Impactful */}
        <h1 className="text-7xl md:text-8xl font-black mb-6 leading-tight tracking-tight">
          <span className="block text-white">Joe's Auto Repair</span>
        </h1>
        
        {/* Tagline with Better Typography */}
        <div className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-gradient-to-r from-warning via-yellow-300 to-warning bg-clip-text">
          Honest Service. Pro Results.
        </div>
        
        {/* Enhanced Description */}
        <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed text-gray-100 font-medium">
          Serving Rochdale, MA with trusted automotive repair and maintenance services. 
          From routine maintenance to complex engine diagnostics, our expert team delivers excellence every time.
        </p>
        
        {/* CTA Buttons - More Professional Layout */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <button 
            onClick={() => document.getElementById('ai-diagnosis')?.scrollIntoView({ behavior: 'smooth' })}
            className="group bg-gradient-to-r from-warning to-yellow-400 hover:from-yellow-400 hover:to-warning text-black font-bold text-xl px-10 py-5 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-warning/50 border-2 border-warning/20"
          >
            <span className="flex items-center gap-3">
              🤖 Free AI Car Diagnosis
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
          
          <button 
            onClick={() => window.open('tel:+17726185558', '_self')}
            className="group bg-white/15 border-2 border-white/40 text-white hover:bg-white hover:text-black font-bold text-xl px-10 py-5 rounded-xl transition-all duration-300 backdrop-blur-sm hover:scale-105 hover:shadow-2xl"
          >
            <span className="flex items-center gap-3">
              📞 Call (772) 618-5558
            </span>
          </button>
          
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group bg-primary/80 border-2 border-primary text-white hover:bg-primary font-bold text-xl px-10 py-5 rounded-xl transition-all duration-300 backdrop-blur-sm hover:scale-105 hover:shadow-2xl"
          >
            <span className="flex items-center gap-3">
              📍 Get Directions
            </span>
          </button>
        </div>
        
        {/* Enhanced Trust Indicators - More Prominent */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-3 p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
            <div className="w-12 h-12 bg-warning/20 rounded-full flex items-center justify-center">
              <span className="text-warning font-bold text-2xl">★</span>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warning">5.0</div>
              <div className="text-white/90 font-medium">Google Rating</div>
              <div className="text-white/70 text-sm">247+ Reviews</div>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-3 p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">✓</span>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">20+</div>
              <div className="text-white/90 font-medium">Years Experience</div>
              <div className="text-white/70 text-sm">Expert Service</div>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-3 p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-2xl">🏆</span>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">1000+</div>
              <div className="text-white/90 font-medium">Happy Customers</div>
              <div className="text-white/70 text-sm">Satisfied & Returning</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;