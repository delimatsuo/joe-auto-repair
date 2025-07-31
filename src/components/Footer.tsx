import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  MapPin, 
  Mail, 
  Clock, 
  Facebook, 
  Instagram, 
  Star 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Business Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Joe's Auto Repair</h3>
            <p className="text-sm mb-4 opacity-90">
              Your trusted automotive partner in Rochdale, MA. 
              Providing honest service and professional results since 2003.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-success text-success-foreground text-xs">
                ASE Certified
              </Badge>
              <Badge variant="secondary" className="bg-success text-success-foreground text-xs">
                BMW Specialist
              </Badge>
              <Badge variant="secondary" className="bg-success text-success-foreground text-xs">
                LGBTQ+ Friendly
              </Badge>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>(508) 555-0123</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@joesautorepair.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>
                  123 Main Street<br />
                  Rochdale, MA 01542
                </span>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Business Hours</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span>8:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span>Closed</span>
              </div>
            </div>
          </div>

          {/* Social Media & Reviews */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4 mb-4">
              <div className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors cursor-pointer">
                <Facebook className="h-5 w-5" />
              </div>
              <div className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors cursor-pointer">
                <Instagram className="h-5 w-5" />
              </div>
            </div>
            
            <div className="text-sm">
              <div className="flex items-center gap-1 mb-2">
                <Star className="h-4 w-4 text-warning fill-current" />
                <Star className="h-4 w-4 text-warning fill-current" />
                <Star className="h-4 w-4 text-warning fill-current" />
                <Star className="h-4 w-4 text-warning fill-current" />
                <Star className="h-4 w-4 text-warning fill-current" />
                <span className="ml-1">5.0 Rating</span>
              </div>
              <p className="opacity-90">Based on 100+ customer reviews</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm opacity-75">
          <p>&copy; 2024 Joe's Auto Repair. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;