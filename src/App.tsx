import React, { Suspense, lazy } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route 
} from 'react-router-dom';
import { motion } from 'framer-motion';

// Lazy load components for better performance
const Header = lazy(() => import('@/components/layout/Header'));
const Home = lazy(() => import('@/pages/Home'));
const Topics = lazy(() => import('@/pages/Topics'));
const Quiz = lazy(() => import('@/pages/Quiz'));
const Resources = lazy(() => import('@/pages/Resources'));
const Results = lazy(() => import('@/pages/Results'));
const Profile = lazy(() => import('@/pages/Profile'));
const Loading = lazy(() => import('@/components/ui/Loading'));

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen pt-16 px-4"
    >
      {children}
    </motion.div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Header />
        <Routes>
          <Route 
            path="/" 
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            } 
          />
          <Route 
            path="/topics" 
            element={
              <PageWrapper>
                <Topics />
              </PageWrapper>
            } 
          />
          <Route 
            path="/quiz" 
            element={
              <PageWrapper>
                <Quiz />
              </PageWrapper>
            } 
          />
          <Route 
            path="/resources" 
            element={
              <PageWrapper>
                <Resources />
              </PageWrapper>
            } 
          />
          <Route 
            path="/results" 
            element={
              <PageWrapper>
                <Results />
              </PageWrapper>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <PageWrapper>
                <Profile />
              </PageWrapper>
            } 
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
