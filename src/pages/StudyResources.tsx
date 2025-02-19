import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpenIcon, 
  FileTextIcon, 
  VideoIcon, 
  DownloadIcon, 
  SearchIcon, 
  FilterIcon 
} from 'lucide-react';

interface Resource {
  id: number;
  title: string;
  type: 'PDF' | 'Video' | 'Lecture Notes';
  description: string;
  category: string;
  downloadLink?: string;
}

const StudyResources: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([
    {
      id: 1,
      title: "Cardiovascular System Anatomy",
      type: 'PDF',
      description: "Comprehensive PDF guide covering heart anatomy and physiology.",
      category: "Anatomy",
      downloadLink: "#"
    },
    {
      id: 2,
      title: "Respiratory System Lecture",
      type: 'Video',
      description: "Detailed video lecture on lung function and respiratory mechanisms.",
      category: "Physiology",
      downloadLink: "#"
    },
    // Add more resources...
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const resourceTypes = ['All', 'PDF', 'Video', 'Lecture Notes'];

  const filteredResources = resources.filter(resource => 
    (selectedType === 'All' || resource.type === selectedType) &&
    resource.title.toLowerCase().includes(searchTerm.toLowerCase())
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

  const resourceVariants = {
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

  const getResourceIcon = (type: string) => {
    switch(type) {
      case 'PDF': return <FileTextIcon className="w-10 h-10 text-red-600" />;
      case 'Video': return <VideoIcon className="w-10 h-10 text-green-600" />;
      case 'Lecture Notes': return <BookOpenIcon className="w-10 h-10 text-blue-600" />;
      default: return null;
    }
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
            Study Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Access comprehensive medical study materials and learning resources.
          </p>
        </div>

        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <input 
              type="text" 
              placeholder="Search resources..."
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
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="
                w-full sm:w-48 pl-10 pr-4 py-3
                border border-gray-300 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500
                appearance-none
              "
            >
              {resourceTypes.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <FilterIcon 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
          </div>
        </div>

        {filteredResources.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-xl text-gray-600">
              No resources found matching your search.
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
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                custom={index}
                variants={resourceVariants}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  {getResourceIcon(resource.type)}
                  <h3 className="text-xl font-semibold text-gray-800">
                    {resource.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  {resource.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                      {resource.type}
                    </span>
                    {resource.category}
                  </span>
                  <a 
                    href={resource.downloadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      text-blue-600 hover:text-blue-800 
                      font-semibold text-sm
                      flex items-center gap-2
                      transition-colors
                    "
                  >
                    <DownloadIcon className="w-4 h-4" />
                    Download
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default StudyResources;
