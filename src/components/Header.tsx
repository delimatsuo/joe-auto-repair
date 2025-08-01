import { Button } from "@/components/ui/button";
import { Phone, MapPin, Star, Sparkles, Clock, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const googleReviewsUrl = "https://www.google.com/maps/place/Joe's+Auto+Repair/@42.2103669,-71.9067418,17z/data=!4m8!3m7!1s0x89e406ebaee3a815:0xf71bf5d0866f54bc!8m2!3d42.2103722!4d-71.9067439!9m1!1b1!16s%2Fg%2F11bc8zg_4f";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      {/* Top bar with contact info */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center text-sm">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+17726185558" className="hover:text-warning transition-colors font-medium">
                  (772) 618-5558
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>81 Huntoon Memorial Hwy, Rochdale, MA</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Mon-Fri: 8AM-6PM</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => window.open(googleReviewsUrl, '_blank')}
                className="flex items-center gap-2 hover:text-warning transition-colors"
              >
                <Star className="w-4 h-4 fill-current" />
                <span className="font-medium">5.0 ★ Reviews</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-black text-foreground">
              <span className="text-primary">Joe's</span> Auto Repair
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#home" className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">
              About
            </a>
            <a href="#services" className="text-foreground hover:text-primary transition-colors font-medium">
              Services
            </a>
            <a href="#brands" className="text-foreground hover:text-primary transition-colors font-medium">
              Specialties
            </a>
            <a href="#reviews" className="text-foreground hover:text-primary transition-colors font-medium">
              Reviews
            </a>
            <a href="#gallery" className="text-foreground hover:text-primary transition-colors font-medium">
              Gallery
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium">
              Contact
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => document.getElementById('ai-diagnosis')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-warning to-yellow-400 text-black border-warning hover:shadow-lg transition-all duration-300 font-bold"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              AI Diagnosis
            </Button>
            <Button 
              size="sm"
              onClick={() => window.open('tel:+17726185558', '_self')}
              className="bg-primary hover:bg-primary-hover text-primary-foreground font-bold"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <a href="#home" className="text-foreground hover:text-primary transition-colors font-medium">
                Home
              </a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">
                About
              </a>
              <a href="#services" className="text-foreground hover:text-primary transition-colors font-medium">
                Services
              </a>
              <a href="#brands" className="text-foreground hover:text-primary transition-colors font-medium">
                Specialties
              </a>
              <a href="#reviews" className="text-foreground hover:text-primary transition-colors font-medium">
                Reviews
              </a>
              <a href="#gallery" className="text-foreground hover:text-primary transition-colors font-medium">
                Gallery
              </a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium">
                Contact
              </a>
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    document.getElementById('ai-diagnosis')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                  className="bg-gradient-to-r from-warning to-yellow-400 text-black border-warning font-bold"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Diagnosis
                </Button>
                <Button 
                  size="sm"
                  onClick={() => window.open('tel:+17726185558', '_self')}
                  className="bg-primary hover:bg-primary-hover text-primary-foreground font-bold"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;