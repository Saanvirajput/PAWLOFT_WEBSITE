import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Donation from './pages/Donation';
import FeedingChart from './pages/FeedingChart';
import FirstAid from './pages/FirstAid';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/donate" element={<Donation />} />
        <Route path="/feeding-chart" element={<FeedingChart />} />
        <Route path="/first-aid" element={<FirstAid />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
