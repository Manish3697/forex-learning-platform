import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Glossary = () => {
  const [terms, setTerms] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('beginner');
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTerms();
  }, [filter]);

  const fetchTerms = async () => {
    try {
      const res = await axios.get(`/api/glossary?difficulty=${filter}`);
      setTerms(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching terms:', err);
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      try {
        const res = await axios.get(`/api/glossary/search/${query}`);
        setTerms(res.data);
      } catch (err) {
        console.error('Error searching:', err);
      }
    } else if (query === '') {
      fetchTerms();
    }
  };

  if (loading) return <div className="text-center p-8">Loading glossary...</div>;

  return (
    <div className="container mx-auto p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Forex Glossary</h1>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="Search terms..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full bg-gray-800 border border-gray-600 rounded px-4 py-2 text-white placeholder-gray-400"
        />
        <div className="flex flex-wrap gap-2">
          {['beginner', 'intermediate', 'advanced'].map(level => (
            <button
              key={level}
              onClick={() => {
                setFilter(level);
                setSearchQuery('');
              }}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filter === level
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {terms.map(term => (
          <div
            key={term._id}
            onClick={() => setSelectedTerm(term)}
            className="bg-gray-800 p-6 rounded-lg cursor-pointer hover:bg-gray-700 transition"
          >
            <h3 className="text-xl font-bold mb-2 text-blue-400">{term.term}</h3>
            <p className="text-gray-400 mb-3 line-clamp-2">{term.definition}</p>
            <span className="inline-block bg-blue-600 px-2 py-1 rounded text-xs">{term.difficulty}</span>
          </div>
        ))}
      </div>

      {/* Selected Term Detail Modal */}
      {selectedTerm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-8 max-w-2xl max-h-96 overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-3xl font-bold text-blue-400">{selectedTerm.term}</h2>
              <button
                onClick={() => setSelectedTerm(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            <p className="text-gray-300 mb-4">{selectedTerm.definition}</p>
            {selectedTerm.detailedExplanation && (
              <div className="mb-4">
                <h4 className="font-bold text-blue-400 mb-2">Detailed Explanation</h4>
                <p className="text-gray-400">{selectedTerm.detailedExplanation}</p>
              </div>
            )}
            {selectedTerm.example && (
              <div className="mb-4">
                <h4 className="font-bold text-blue-400 mb-2">Example</h4>
                <p className="text-gray-400">{selectedTerm.example}</p>
              </div>
            )}
            {selectedTerm.practicalApplication && (
              <div>
                <h4 className="font-bold text-blue-400 mb-2">Practical Application</h4>
                <p className="text-gray-400">{selectedTerm.practicalApplication}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Glossary;
