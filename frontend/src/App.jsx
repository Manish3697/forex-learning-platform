import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import LearnForex from './pages/LearnForex';
import TradingSimulator from './pages/TradingSimulator';
import TradeJournal from './pages/TradeJournal';
import Glossary from './pages/Glossary';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/learn" element={<LearnForex />} />
        <Route path="/simulator" element={<TradingSimulator />} />
        <Route path="/journal" element={<TradeJournal />} />
        <Route path="/glossary" element={<Glossary />} />
      </Routes>
    </Router>
  );
}

export default App;
