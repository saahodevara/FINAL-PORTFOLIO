
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PortfolioProvider } from './context/PortfolioContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import BuilderPage from './pages/BuilderPage';
import PreviewPage from './pages/PreviewPage';
import GalleryPage from './pages/GalleryPage';
import ATSAnalyzerPage from './pages/ATSAnalyzerPage';
import AuthCallbackPage from './pages/AuthCallbackPage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/ats-analyzer" element={<ATSAnalyzerPage />} />
                <Route path="/auth/callback" element={<AuthCallbackPage />} />
                
                {/* Protected Routes */}
                <Route 
                  path="/builder" 
                  element={
                    <ProtectedRoute>
                      <BuilderPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/preview" 
                  element={
                    <ProtectedRoute>
                      <PreviewPage />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </div>
          </div>
        </Router>
      </PortfolioProvider>
    </AuthProvider>
  );
};

export default App;
