import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "../components/ui/button";
import { CheckIcon, XIcon } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      text: "What is the primary function of the liver?",
      options: [
        "Produce insulin", 
        "Detoxification and metabolism", 
        "Pump blood", 
        "Produce white blood cells"
      ],
      correctAnswer: 1
    },
    // Add more questions...
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      const isCorrect = selectedAnswer === questions[currentQuestionIndex].correctAnswer;
      
      if (isCorrect) {
        setScore(prev => prev + 1);
      }

      if (currentQuestionIndex < questions.length - 1) {
        setTimeout(() => {
          setCurrentQuestionIndex(prev => prev + 1);
          setSelectedAnswer(null);
        }, 1000);
      } else {
        setShowResult(true);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
  };

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

  return (
    <motion.div 
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-20"
    >
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Medical Quiz
                </h2>
                <p className="text-gray-600">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </p>
              </div>

              <motion.div 
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-100 p-5 rounded-lg"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {questions[currentQuestionIndex].text}
                </h3>

                <div className="space-y-3">
                  {questions[currentQuestionIndex].options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswerSelect(index)}
                      className={`
                        w-full text-left p-3 rounded-lg transition-colors
                        ${selectedAnswer === index 
                          ? 'bg-blue-100 border-2 border-blue-500' 
                          : 'bg-white hover:bg-gray-100'}
                        ${selectedAnswer !== null && 
                          index === questions[currentQuestionIndex].correctAnswer 
                          ? 'border-2 border-green-500' 
                          : ''}
                        ${selectedAnswer !== null && 
                          selectedAnswer !== questions[currentQuestionIndex].correctAnswer && 
                          selectedAnswer === index 
                          ? 'border-2 border-red-500' 
                          : ''}
                      `}
                    >
                      <div className="flex justify-between items-center">
                        <span>{option}</span>
                        {selectedAnswer !== null && (
                          index === questions[currentQuestionIndex].correctAnswer ? (
                            <CheckIcon className="w-5 h-5 text-green-500" />
                          ) : selectedAnswer === index ? (
                            <XIcon className="w-5 h-5 text-red-500" />
                          ) : null
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <Button 
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </motion.div>
          ) : (
            <motion.div 
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-800">
                Quiz Completed!
              </h2>
              <p className="text-xl text-gray-600">
                Your Score: {score} / {questions.length}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={resetQuiz}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Retake Quiz
                </Button>
                <Button 
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  View Detailed Results
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Quiz;
