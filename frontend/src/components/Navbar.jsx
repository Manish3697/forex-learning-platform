import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
      <div className="container mx-auto px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-400">
          📈 ForexMaster
        </Link>
        <div className="flex gap-6">
          <Link to="/" className="text-gray-300 hover:text-white transition">Dashboard</Link>
          <Link to="/learn" className="text-gray-300 hover:text-white transition">Learn</Link>
          <Link to="/simulator" className="text-gray-300 hover:text-white transition">Simulator</Link>
          <Link to="/journal" className="text-gray-300 hover:text-white transition">Journal</Link>
          <Link to="/glossary" className="text-gray-300 hover:text-white transition">Glossary</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
