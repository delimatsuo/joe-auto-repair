import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import QuickActionsSection from "@/components/QuickActionsSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BrandsSection from "@/components/BrandsSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { AIDiagnosisSection } from "@/components/AIDiagnosisSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <QuickActionsSection />
      <AboutSection />
      <ServicesSection />
      <AIDiagnosisSection />
      <BrandsSection />
      <TestimonialsSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
