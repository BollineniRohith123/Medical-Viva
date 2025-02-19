import React from "react";
import { Card } from "../ui/card";
import { Avatar } from "../ui/avatar";
import { motion } from "framer-motion";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
}

interface Statistic {
  label: string;
  value: string;
  description: string;
}

interface SocialProofProps {
  testimonials?: Testimonial[];
  statistics?: Statistic[];
}

const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    role: "Medical Resident",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    content:
      "Speaking with the AI examiner feels incredibly natural. The voice interactions helped me develop the confidence I needed for my actual viva exams.",
  },
  {
    id: "2",
    name: "James Wilson",
    role: "Medical Student",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    content:
      "This platform transformed how I prepare for vivas. The keyword analysis helped me structure my answers better.",
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    role: "Recent Graduate",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    content:
      "I passed my final exams with distinction, thanks to the comprehensive preparation this platform provided.",
  },
];

const defaultStatistics: Statistic[] = [
  {
    label: "Success Rate",
    value: "94%",
    description: "of users report improved exam performance",
  },
  {
    label: "Practice Sessions",
    value: "50K+",
    description: "AI-powered interview simulations completed",
  },
  {
    label: "User Satisfaction",
    value: "4.8/5",
    description: "average rating from medical students",
  },
];

const SocialProof: React.FC<SocialProofProps> = ({
  testimonials = defaultTestimonials,
  statistics = defaultStatistics,
}) => {
  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Trusted by Medical Students Worldwide
        </h2>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {statistics.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="text-center p-6 bg-gray-50 rounded-lg"
            >
              <div className="text-4xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-gray-700 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600">{stat.description}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="p-6 h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12">
                    <img
                      alt={testimonial.name}
                      src={testimonial.avatar}
                      className="object-cover"
                    />
                  </Avatar>
                  <div className="ml-4">
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 flex-grow">{testimonial.content}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
