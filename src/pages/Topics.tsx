import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BookIcon, 
  SearchIcon, 
  FilterIcon 
} from 'lucide-react';

interface Topic {
  id: number;
  title: string;
  description: string;
  category: string;
}

const Topics: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([
    {
      id: 1,
      title: "Cardiovascular System",
      description: "Comprehensive overview of heart, blood vessels, and circulation.",
      category: "Anatomy"
    },
    {
      id: 2,
      title: "Respiratory Physiology",
      description: "In-depth study of lung function and breathing mechanisms.",
      category: "Physiology"
    },
    // Add more topics...
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Anatomy', 'Physiology', 'Pathology', 'Pharmacology'];

  const filteredTopics = topics.filter(topic => 
    (selectedCategory === 'All' || topic.category === selectedCategory) &&
    topic.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -50 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  const topicVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1, 
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.3
      }
    })
  };

  return (
    <motion.div 
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-gray-50 pt-20 pb-12 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Medical Topics
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore comprehensive medical topics tailored for exam preparation.
          </p>
        </div>

        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <input 
              type="text" 
              placeholder="Search topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
                w-full pl-10 pr-4 py-3 
                border border-gray-300 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
            />
            <SearchIcon 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
          </div>

          <div className="relative">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="
                w-full sm:w-48 pl-10 pr-4 py-3
                border border-gray-300 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500
                appearance-none
              "
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <FilterIcon 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
          </div>
        </div>

        {filteredTopics.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-xl text-gray-600">
              No topics found matching your search.
            </p>
          </div>
        ) : (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredTopics.map((topic, index) => (
              <motion.div
                key={topic.id}
                custom={index}
                variants={topicVariants}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <BookIcon className="w-10 h-10 text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-800">
                    {topic.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  {topic.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Category: {topic.category}
                  </span>
                  <Link 
                    to={`/topics/${topic.id}`}
                    className="
                      text-blue-600 hover:text-blue-800 
                      font-semibold text-sm
                      transition-colors
                    "
                  >
                    Explore Topic
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Topics;
