import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './nav/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

// Modular Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Voting from './pages/Voting';
import Admin from './pages/Admin';
import Features from './pages/Features';
import Contact from './pages/Contact';

// Styles
import './App.css';
import './style.css';
import './webdesign.css';

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Service" element={<Features />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/voting" element={<ProtectedRoute><Voting /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
