import React, { useState } from 'react';

interface Resource {
  id: number;
  title: string;
  type: 'Book' | 'Video' | 'Article' | 'Course';
  description: string;
  link: string;
  tags: string[];
}

const StudyResources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<Resource['type'] | 'All'>('All');

  const resources: Resource[] = [
    {
      id: 1,
      title: 'Gray\'s Anatomy',
      type: 'Book',
      description: 'Comprehensive medical anatomy reference',
      link: 'https://example.com/grays-anatomy',
      tags: ['Anatomy', 'Reference']
    },
    {
      id: 2,
      title: 'Physiology Explained',
      type: 'Video',
      description: 'In-depth video series on human physiology',
      link: 'https://example.com/physiology-videos',
      tags: ['Physiology', 'Video']
    },
    {
      id: 3,
      title: 'Medical Pathology Insights',
      type: 'Course',
      description: 'Online course covering key pathology concepts',
      link: 'https://example.com/pathology-course',
      tags: ['Pathology', 'Online Course']
    }
  ];

  const filteredResources = resources.filter(resource => 
    (selectedType === 'All' || resource.type === selectedType) &&
    (resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
     resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Study Resources</h1>
        
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Search resources..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <select 
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as Resource['type'] | 'All')}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Types</option>
            <option value="Book">Books</option>
            <option value="Video">Videos</option>
            <option value="Article">Articles</option>
            <option value="Course">Courses</option>
          </select>
        </div>

        {filteredResources.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-xl text-gray-600 mb-4">
              No resources found matching your search.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map(resource => (
              <div 
                key={resource.id} 
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <span 
                    className={`
                      px-3 py-1 rounded-full text-xs font-medium
                      ${
                        resource.type === 'Book' ? 'bg-green-100 text-green-800' :
                        resource.type === 'Video' ? 'bg-blue-100 text-blue-800' :
                        resource.type === 'Article' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-purple-100 text-purple-800'
                      }
                    `}
                  >
                    {resource.type}
                  </span>
                </div>

                <h2 className="text-xl font-semibold mb-2">{resource.title}</h2>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {resource.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a 
                    href={resource.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="
                      bg-blue-500 text-white 
                      px-3 py-2 rounded-lg 
                      text-sm
                      hover:bg-blue-600 
                      transition-colors 
                      focus:outline-none 
                      focus:ring-2 
                      focus:ring-blue-500
                    "
                  >
                    View
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyResources;
