import React from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Brain,
  MessageSquareText,
  LineChart,
  Zap,
  Target,
  BookOpen,
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({
  icon,
  title = "Feature Title",
  description = "Feature description goes here",
}: FeatureCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="p-6 h-full bg-white hover:shadow-lg transition-shadow duration-300">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="p-3 rounded-full bg-blue-100">{icon}</div>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </Card>
    </motion.div>
  );
};

interface FeatureShowcaseProps {
  features?: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
}

const defaultFeatures = [
  {
    icon: <Brain className="w-8 h-8 text-blue-600" />,
    title: "Natural Voice Interaction",
    description:
      "Engage in natural conversations with our AI examiner using voice, just like a real medical viva",
  },
  {
    icon: <MessageSquareText className="w-8 h-8 text-blue-600" />,
    title: "Smart Feedback System",
    description:
      "Receive instant, detailed feedback on your responses with improvement suggestions",
  },
  {
    icon: <LineChart className="w-8 h-8 text-blue-600" />,
    title: "Progress Tracking",
    description:
      "Monitor your improvement with detailed analytics and performance insights",
  },
  {
    icon: <Zap className="w-8 h-8 text-blue-600" />,
    title: "Quick Practice Sessions",
    description:
      "Efficient 15-minute practice rounds focused on specific topics",
  },
  {
    icon: <Target className="w-8 h-8 text-blue-600" />,
    title: "Targeted Learning",
    description: "Focus on your weak areas with personalized question sets",
  },
  {
    icon: <BookOpen className="w-8 h-8 text-blue-600" />,
    title: "Comprehensive Coverage",
    description: "Access a vast library of medical topics and exam scenarios",
  },
];

const FeatureShowcase = ({
  features = defaultFeatures,
}: FeatureShowcaseProps) => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Powerful Features for Medical Excellence
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to excel in your medical examinations
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
