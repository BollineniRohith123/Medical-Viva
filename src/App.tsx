import React, { Suspense, lazy } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route,
  useLocation
} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Toaster } from '@/components/ui/toaster';

// Lazy load components for better performance
const Layout = lazy(() => import('./components/layout/Layout'));
const Home = lazy(() => import('./components/home'));
const MedicalTopics = lazy(() => import('./components/MedicalTopics'));
const QuizInterface = lazy(() => import('./components/QuizInterface'));
const ResultsDashboard = lazy(() => import('./components/ResultsDashboard'));
const UserProfile = lazy(() => import('./components/UserProfile'));
const StudyResources = lazy(() => import('./components/StudyResources'));
const Loading = lazy(() => import('./components/ui/Loading'));

// Page wrapper for transitions
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      initial="initial"
      animate="in"
      exit="out"
      variants={{
        initial: { 
          opacity: 0, 
          scale: 0.95,
          translateY: 20
        },
        in: { 
          opacity: 1, 
          scale: 1,
          translateY: 0,
          transition: {
            duration: 0.4,
            ease: 'easeInOut'
          }
        },
        out: { 
          opacity: 0, 
          scale: 0.95,
          translateY: 20,
          transition: {
            duration: 0.3,
            ease: 'easeInOut'
          }
        }
      }}
      className="min-h-screen pt-16 px-4 md:px-6 lg:px-8"
    >
      {children}
    </motion.div>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<Loading />}>
          <Layout />
          <AnimatePresence mode="wait">
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
                    <MedicalTopics />
                  </PageWrapper>
                } 
              />
              <Route 
                path="/quiz" 
                element={
                  <PageWrapper>
                    <QuizInterface />
                  </PageWrapper>
                } 
              />
              <Route 
                path="/results" 
                element={
                  <PageWrapper>
                    <ResultsDashboard />
                  </PageWrapper>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <PageWrapper>
                    <UserProfile />
                  </PageWrapper>
                } 
              />
              <Route 
                path="/resources" 
                element={
                  <PageWrapper>
                    <StudyResources />
                  </PageWrapper>
                } 
              />
            </Routes>
          </AnimatePresence>
          <Toaster />
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
