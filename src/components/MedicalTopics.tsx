import React, { useState } from 'react';

interface Topic {
  id: number;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const MedicalTopics: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const topics: Topic[] = [
    {
      id: 1,
      title: 'Human Anatomy',
      description: 'Comprehensive overview of human body systems and structures',
      difficulty: 'Beginner'
    },
    {
      id: 2,
      title: 'Physiology',
      description: 'Study of functions and mechanisms of living systems',
      difficulty: 'Intermediate'
    },
    {
      id: 3,
      title: 'Pathology',
      description: 'Understanding disease processes and their impact',
      difficulty: 'Advanced'
    }
  ];

  const filteredTopics = topics.filter(topic => 
    topic.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Medical Topics</h1>
      
      <div className="mb-6">
        <input 
          type="text" 
          placeholder="Search topics..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTopics.map(topic => (
          <div 
            key={topic.id} 
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-all duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">{topic.title}</h2>
            <p className="text-gray-600 mb-4">{topic.description}</p>
            <span 
              className={`
                px-3 py-1 rounded-full text-sm 
                ${topic.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' : 
                  topic.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'}
              `}
            >
              {topic.difficulty}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalTopics;
