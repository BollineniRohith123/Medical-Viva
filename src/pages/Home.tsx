import React from 'react';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold text-center mb-6">
        Medical Viva Assistant
      </h1>
      <p className="text-center text-gray-600">
        Welcome to your medical study companion
      </p>
    </motion.div>
  );
};

export default Home;
