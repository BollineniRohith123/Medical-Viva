import React from "react";
import FloatingNav from "./ui/floating-nav";
import { Toaster } from "./ui/toaster";
import { useToast } from "./ui/use-toast";
import HeroSection from "./landing/HeroSection";
import FeatureShowcase from "./landing/FeatureShowcase";
import DemoSection from "./landing/DemoSection";
import SocialProof from "./landing/SocialProof";
import BottomCTA from "./landing/BottomCTA";

interface HomeProps {
  onCtaClick?: () => void;
}

const Home: React.FC<HomeProps> = ({ 
  onCtaClick = () => console.log("CTA clicked") 
}) => {
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-white">
      <FloatingNav />
      <Toaster />
      
      <div className="container mx-auto px-4 space-y-16">
        <HeroSection onCtaClick={onCtaClick} />
        <FeatureShowcase />
        <DemoSection />
        <SocialProof />
        <BottomCTA onButtonClick={onCtaClick} />
      </div>
    </div>
  );
};

export default Home;
