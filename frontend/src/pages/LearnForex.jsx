import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LearnForex = () => {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState('basics');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, [filter]);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`/api/courses?category=${filter}`);
      setCourses(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setLoading(false);
    }
  };

  const categories = ['basics', 'intermediate', 'advanced', 'psychology', 'riskManagement', 'strategies'];

  return (
    <div className="container mx-auto p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Learn Forex Trading</h1>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === cat
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      {loading ? (
        <div className="text-center">Loading courses...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div key={course._id} className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition">
              <div className="h-40 bg-gradient-to-r from-blue-600 to-purple-600"></div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{course.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="bg-blue-600 px-2 py-1 rounded">{course.level}</span>
                  <span className="text-gray-400">{course.duration} min</span>
                </div>
                <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold transition">
                  Start Learning
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LearnForex;
