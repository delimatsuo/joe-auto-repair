import { Badge } from "@/components/ui/badge";
import { CheckCircle, Award, Users, Clock } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              About Joe's Auto Repair
            </h2>
            <p className="text-lg text-muted-foreground">
              Your trusted automotive partner in Rochdale, MA
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-foreground">
                Meet Joe - Your Local Auto Expert
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                With over 20 years of experience in automotive repair, Joe has built his reputation 
                on honest service and professional results. Starting as a young mechanic with a 
                passion for problem-solving, Joe opened his shop in Rochdale with one mission: 
                to provide transparent, reliable auto repair services to his community.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Joe specializes in BMW and luxury vehicle repair, but welcomes all makes and models. 
                His commitment to ongoing education and the latest diagnostic equipment ensures your 
                vehicle receives the best care possible.
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="secondary" className="bg-success text-success-foreground">
                  ASE Certified
                </Badge>
                <Badge variant="secondary" className="bg-success text-success-foreground">
                  BMW Specialist
                </Badge>
                <Badge variant="secondary" className="bg-success text-success-foreground">
                  LGBTQ+ Friendly
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-card rounded-lg shadow-sm">
                <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary mb-2">20+</div>
                <div className="text-muted-foreground">Years Experience</div>
              </div>
              
              <div className="text-center p-6 bg-card rounded-lg shadow-sm">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary mb-2">1000+</div>
                <div className="text-muted-foreground">Happy Customers</div>
              </div>
              
              <div className="text-center p-6 bg-card rounded-lg shadow-sm">
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary mb-2">5★</div>
                <div className="text-muted-foreground">Average Rating</div>
              </div>
              
              <div className="text-center p-6 bg-card rounded-lg shadow-sm">
                <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;