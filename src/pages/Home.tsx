import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BookOpenIcon, 
  ClipboardCheckIcon, 
  TrophyIcon, 
  BookmarkIcon 
} from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: <BookOpenIcon className="w-12 h-12 text-blue-600" />,
      title: "Comprehensive Topics",
      description: "Explore a wide range of medical topics with in-depth study materials."
    },
    {
      icon: <ClipboardCheckIcon className="w-12 h-12 text-green-600" />,
      title: "Interactive Quizzes",
      description: "Test your knowledge with adaptive and challenging medical quizzes."
    },
    {
      icon: <TrophyIcon className="w-12 h-12 text-yellow-600" />,
      title: "Track Progress",
      description: "Monitor your learning journey and identify areas of improvement."
    },
    {
      icon: <BookmarkIcon className="w-12 h-12 text-purple-600" />,
      title: "Save Resources",
      description: "Bookmark and revisit important study materials anytime."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Medical Viva Assistant
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Your ultimate companion for medical exam preparation, offering comprehensive study resources and interactive learning experiences.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <Link 
            to="/topics"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Start Learning
          </Link>
          <Link 
            to="/quiz"
            className="bg-white border border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Take a Quiz
          </Link>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                {feature.icon}
                <h3 className="text-xl font-semibold text-gray-800">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
