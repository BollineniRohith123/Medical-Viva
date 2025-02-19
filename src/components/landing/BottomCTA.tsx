import React from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

interface BottomCTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const BottomCTA = ({
  title = "Start Speaking With Your AI Medical Examiner",
  description = "Join thousands of medical students who practice with our voice-based AI examiner. Natural conversations, instant feedback, and realistic exam scenarios.",
  buttonText = "Start Speaking Now",
  onButtonClick = () => {},
}: BottomCTAProps) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            size="lg"
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full text-lg font-semibold"
            onClick={onButtonClick}
          >
            {buttonText}
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default BottomCTA;
