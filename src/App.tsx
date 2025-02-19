import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layouts
import Header from '../components/layout/Header';

// Pages (Lazy Loaded)
const Home = lazy(() => import('../pages/Home'));
const Quiz = lazy(() => import('../pages/Quiz'));
const Topics = lazy(() => import('../pages/Topics'));
const StudyResources = lazy(() => import('../pages/StudyResources'));

// Loading Component
const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <AnimatePresence mode="wait">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/topics" element={<Topics />} />
              <Route path="/resources" element={<StudyResources />} />
              
              {/* Fallback Route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </div>
    </Router>
  );
};

export default App;
