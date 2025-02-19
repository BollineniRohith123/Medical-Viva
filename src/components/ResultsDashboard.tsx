import React from 'react';
import { Link } from 'react-router-dom';

interface QuizResult {
  id: number;
  topic: string;
  score: number;
  totalQuestions: number;
  date: string;
}

const ResultsDashboard: React.FC = () => {
  const quizResults: QuizResult[] = [
    {
      id: 1,
      topic: 'Human Anatomy',
      score: 8,
      totalQuestions: 10,
      date: '2024-02-15'
    },
    {
      id: 2,
      topic: 'Physiology',
      score: 6,
      totalQuestions: 10,
      date: '2024-02-20'
    },
    {
      id: 3,
      topic: 'Pathology',
      score: 9,
      totalQuestions: 10,
      date: '2024-02-25'
    }
  ];

  const calculatePerformance = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return 'Excellent';
    if (percentage >= 75) return 'Good';
    if (percentage >= 60) return 'Average';
    return 'Needs Improvement';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Quiz Results Dashboard</h1>
        
        <div className="grid gap-6">
          {quizResults.map(result => (
            <div 
              key={result.id} 
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{result.topic}</h2>
                <span 
                  className={`
                    px-3 py-1 rounded-full text-sm font-medium
                    ${
                      calculatePerformance(result.score, result.totalQuestions) === 'Excellent' ? 'bg-green-100 text-green-800' :
                      calculatePerformance(result.score, result.totalQuestions) === 'Good' ? 'bg-blue-100 text-blue-800' :
                      calculatePerformance(result.score, result.totalQuestions) === 'Average' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }
                  `}
                >
                  {calculatePerformance(result.score, result.totalQuestions)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600">
                    Score: {result.score} / {result.totalQuestions}
                  </p>
                  <p className="text-gray-500 text-sm">Date: {result.date}</p>
                </div>
                
                <Link 
                  to={`/quiz?topic=${result.topic.toLowerCase().replace(' ', '-')}`}
                  className="
                    bg-blue-500 text-white 
                    px-4 py-2 rounded-lg 
                    hover:bg-blue-600 
                    transition-colors 
                    focus:outline-none 
                    focus:ring-2 
                    focus:ring-blue-500
                  "
                >
                  Retake Quiz
                </Link>
              </div>
            </div>
          ))}
        </div>

        {quizResults.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-xl text-gray-600 mb-4">
              No quiz results available yet.
            </p>
            <Link 
              to="/quiz" 
              className="
                bg-blue-500 text-white 
                px-6 py-3 rounded-lg 
                hover:bg-blue-600 
                transition-colors
              "
            >
              Start Your First Quiz
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsDashboard;
