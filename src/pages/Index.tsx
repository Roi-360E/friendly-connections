import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import AuthoritySection from "@/components/AuthoritySection";
import ShowcaseSection from "@/components/ShowcaseSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <HeroSection />
      <FeaturesSection />
      <AuthoritySection />
      <ShowcaseSection />
      <PricingSection />
      <FAQSection />
      <FooterSection />
    </div>
  );
};

export default Index;
