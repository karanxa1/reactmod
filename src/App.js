import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AppDetail from './components/AppDetail';
import Games from './components/Games';
import Apps from './components/Apps';
import Blog from './components/Blog';
import FAQ from './components/FAQ';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app/:id" element={<AppDetail />} />
          <Route path="/games" element={<Games />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
