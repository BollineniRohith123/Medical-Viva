import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const MedicalTopics = lazy(() => import('./pages/Topics'));
const QuizInterface = lazy(() => import('./pages/Quiz'));
const ResultsDashboard = lazy(() => import('./pages/Results'));
const UserProfile = lazy(() => import('./pages/Profile'));
const StudyResources = lazy(() => import('./pages/Resources'));

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/topics" element={<MedicalTopics />} />
            <Route path="/quiz" element={<QuizInterface />} />
            <Route path="/results" element={<ResultsDashboard />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/resources" element={<StudyResources />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
};

export default App;
