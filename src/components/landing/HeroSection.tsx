import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const HeroSection = ({
  title = "Practice Medical Exams with Voice AI",
  subtitle = "Experience natural, voice-based medical exam preparation with our AI that listens, responds, and guides you just like a real examiner.",
  ctaText = "Start Free Trial",
  onCtaClick = () => console.log("CTA clicked"),
}: HeroSectionProps) => {
  return (
    <div className="w-full min-h-[700px] bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-teal-100" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div className="container mx-auto px-4 h-full flex flex-col lg:flex-row items-center justify-between py-16 gap-8 relative z-10">
        {/* Left side - Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 max-w-xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
              {subtitle}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Button
              size="lg"
              onClick={onCtaClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 transform"
            >
              {ctaText}
            </Button>
          </motion.div>
        </motion.div>

        {/* Right side - Animation */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 relative min-h-[400px] w-full max-w-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl shadow-lg overflow-hidden border border-blue-100">
            {/* Animated elements */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=medical-student"
                alt="Student Avatar"
                className="w-24 h-24 drop-shadow-lg"
              />
            </motion.div>

            {/* Floating elements */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="absolute top-1/4 right-1/4 w-16 h-16 bg-blue-200 rounded-full opacity-30"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, -5, 5, 0],
                transition: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-teal-200 rounded-full opacity-30"
            />

            {/* Medical symbols */}
            <div className="absolute top-10 right-10">
              <motion.div
                animate={{
                  rotate: 360,
                  transition: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
                className="w-12 h-12 text-blue-500 flex items-center justify-center"
              >
                ⚕️
              </motion.div>
            </div>

            {/* Voice waves animation */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scaleY: [1, 1.5, 1],
                    transition: {
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.1,
                    },
                  }}
                  className="w-1 h-8 bg-blue-400 rounded-full opacity-50"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
