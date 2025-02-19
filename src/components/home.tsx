import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import FloatingNav from "./ui/floating-nav";
import ScrollProgress from "./ui/scroll-progress";
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

const Home = ({ onCtaClick = () => console.log("CTA clicked") }: HomeProps) => {
  return (
    <div className="min-h-screen bg-white pt-16">
      <ScrollProgress />
      <Header />
      <Toaster />
      <FloatingNav />
      <main>
        <HeroSection onCtaClick={onCtaClick} />
        <FeatureShowcase />
        <DemoSection />
        <SocialProof />
        <BottomCTA onButtonClick={onCtaClick} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
