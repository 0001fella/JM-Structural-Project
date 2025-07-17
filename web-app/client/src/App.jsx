import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { QuotationProvider } from './context/QuotationContext';
import { ProjectProvider } from './context/ProjectContext';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import EditorPage from './pages/EditorPage';
import ProtectedRoute from './components/auth/protectedRoute';

function App() {
  return (
    <AuthProvider>
      <QuotationProvider>
        <ProjectProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/editor/:projectId"
              element={
                <ProtectedRoute>
                  <EditorPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </ProjectProvider>
      </QuotationProvider>
    </AuthProvider>
  );
}

export default App;
