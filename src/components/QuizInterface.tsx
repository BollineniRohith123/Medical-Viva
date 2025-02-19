import React, { useState } from 'react';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

const QuizInterface: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      text: "What is the primary function of the mitochondria?",
      options: [
        "Protein synthesis", 
        "Energy production", 
        "Cell division", 
        "Waste removal"
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      text: "Which organ is responsible for filtering blood?",
      options: [
        "Liver", 
        "Heart", 
        "Kidneys", 
        "Lungs"
      ],
      correctAnswer: 2
    }
  ];

  const handleAnswerClick = (selectedAnswer: number) => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white shadow-lg rounded-lg p-8">
        {showScore ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
            <p className="text-xl mb-6">
              You scored {score} out of {questions.length}
            </p>
            <button 
              onClick={resetQuiz}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retake Quiz
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">
                Question {currentQuestion + 1} of {questions.length}
              </h2>
              <p className="text-xl mb-6">{questions[currentQuestion].text}</p>
            </div>

            <div className="grid gap-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  className="
                    w-full text-left p-4 
                    border rounded-lg 
                    hover:bg-blue-50 
                    transition-colors
                    focus:outline-none 
                    focus:ring-2 
                    focus:ring-blue-500
                  "
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizInterface;
