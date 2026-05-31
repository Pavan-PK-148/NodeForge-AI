import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { PortfolioBuilderProvider } from './context/PortfolioBuilderContext';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Wizard from './pages/Wizard';
import Builder from './pages/Builder';
import PublicView from './pages/PublicView';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <PortfolioBuilderProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/p/:username" element={<PublicView />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path="/wizard" element={
            <ProtectedRoute><Wizard /></ProtectedRoute>
          } />
          <Route path="/builder" element={
            <ProtectedRoute><Builder /></ProtectedRoute>
          } />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </PortfolioBuilderProvider>
  );
}

export default App;