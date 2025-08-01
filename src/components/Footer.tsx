import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  MapPin, 
  Mail, 
  Clock, 
  Star,
  ExternalLink
} from "lucide-react";

const Footer = () => {
  const googleReviewsUrl = "https://www.google.com/maps/place/Joe's+Auto+Repair/@42.2103669,-71.9067418,17z/data=!4m8!3m7!1s0x89e406ebaee3a815:0xf71bf5d0866f54bc!8m2!3d42.2103722!4d-71.9067439!9m1!1b1!16s%2Fg%2F11bc8zg_4f";

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
                <span>+1 (772) 618-5558</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>
                  81 Huntoon Memorial Hwy<br />
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
                <span>8:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span>9:00 AM - 1:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span>Closed</span>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Reviews</h4>
            
            <div className="text-sm">
              <div className="flex items-center gap-1 mb-2">
                <Star className="h-4 w-4 text-warning fill-current" />
                <Star className="h-4 w-4 text-warning fill-current" />
                <Star className="h-4 w-4 text-warning fill-current" />
                <Star className="h-4 w-4 text-warning fill-current" />
                <Star className="h-4 w-4 text-warning fill-current" />
                <span className="ml-1">5.0 Rating</span>
              </div>
              <p className="opacity-90 mb-2">Based on 100+ customer reviews</p>
              <button
                onClick={() => window.open(googleReviewsUrl, '_blank')}
                className="inline-flex items-center gap-1 text-xs text-warning hover:text-warning/80 transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
                View Google Reviews
              </button>
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