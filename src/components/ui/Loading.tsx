import React from 'react';
import { motion } from 'framer-motion';

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: [0.8, 1.1, 1], 
          opacity: [0, 1, 1],
          transition: { 
            duration: 1.2, 
            repeat: Infinity, 
            repeatType: 'reverse' 
          }
        }}
        className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
      />
    </div>
  );
};

export default Loading;
