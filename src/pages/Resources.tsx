import React from 'react';
import { motion } from 'framer-motion';

const Resources: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-2xl font-bold mb-6">Study Resources</h1>
      <p className="text-gray-600">
        Access comprehensive medical study materials
      </p>
    </motion.div>
  );
};

export default Resources;
