import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './components/home';
import MedicalTopics from './components/MedicalTopics';
import QuizInterface from './components/QuizInterface';
import ResultsDashboard from './components/ResultsDashboard';
import UserProfile from './components/UserProfile';
import StudyResources from './components/StudyResources';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="topics" element={<MedicalTopics />} />
        <Route path="quiz" element={<QuizInterface />} />
        <Route path="results" element={<ResultsDashboard />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="resources" element={<StudyResources />} />
      </Route>
    </Routes>
  );
};

export default App;
