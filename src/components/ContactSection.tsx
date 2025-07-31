import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Phone, 
  MapPin, 
  Mail, 
  Clock,
  ExternalLink
} from "lucide-react";

const ContactSection = () => {
  const googleMapsUrl = "https://www.google.com/maps/place/Joe's+Auto+Repair/@42.2103669,-71.9067418,17z/data=!4m8!3m7!1s0x89e406ebaee3a815:0xf71bf5d0866f54bc!8m2!3d42.2103722!4d-71.9067439!9m1!1b1!16s%2Fg%2F11bc8zg_4f";
  const googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2948.8234567890123!2d-71.9067418!3d42.2103669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e406ebaee3a815%3A0xf71bf5d0866f54bc!2sJoe's%20Auto%20Repair!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus";

  return (
    <section id="contact" className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Visit Our Shop
          </h2>
          <p className="text-lg text-muted-foreground">
            Located in the heart of Rochdale, MA - Easy to find, easy to trust
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <div className="grid gap-6">
                <Card className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-colors">
                      <Phone className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">Call Us Today</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <a 
                      href="tel:+15085550123" 
                      className="text-2xl font-bold text-primary hover:text-primary-hover transition-colors"
                    >
                      (508) 555-0123
                    </a>
                    <p className="text-muted-foreground mt-2">Ready to help with your automotive needs</p>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-colors">
                      <MapPin className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">Our Location</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <button
                      onClick={() => window.open(googleMapsUrl, '_blank')}
                      className="text-lg font-semibold text-primary hover:text-primary-hover transition-colors group"
                    >
                      123 Main Street<br />
                      Rochdale, MA 01542
                      <ExternalLink className="h-4 w-4 ml-2 inline group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-muted-foreground mt-2">Click to get directions</p>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-colors">
                      <Clock className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">Business Hours</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-center">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Monday - Friday:</span>
                        <span className="text-primary font-semibold">8:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Saturday:</span>
                        <span className="text-primary font-semibold">9:00 AM - 1:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Sunday:</span>
                        <span className="text-muted-foreground">Closed</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="lg:order-1">
              <Card className="overflow-hidden shadow-lg h-full">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">Find Us on the Map</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="relative h-96 lg:h-full min-h-[400px]">
                    <iframe
                      src={googleMapsEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-b-lg"
                      title="Joe's Auto Repair Location"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;