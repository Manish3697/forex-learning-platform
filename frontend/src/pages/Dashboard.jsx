import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userId = localStorage.getItem('userId');
      
      // Fetch user data
      const userRes = await axios.get(`/api/users/profile/${userId}`);
      setUserData(userRes.data);

      // Fetch statistics
      const statsRes = await axios.get(`/api/users/${userId}/statistics`);
      setStatistics(statsRes.data);

      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="container mx-auto p-8 bg-gray-900 text-white min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* User Profile Card */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Welcome, {userData?.firstName || userData?.username}!</h2>
          <p className="text-gray-400 mb-2">Experience Level: <span className="text-blue-400 font-bold">{userData?.experienceLevel}</span></p>
          <p className="text-gray-400">Email: <span className="text-blue-400">{userData?.email}</span></p>
        </div>

        {/* Account Balance */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Simulator Balance</h3>
          <p className="text-4xl font-bold text-green-400">${statistics?.simulatorBalance?.toFixed(2)}</p>
          <p className="text-gray-400 text-sm mt-2">Net Profit: ${(statistics?.totalProfit - statistics?.totalLoss)?.toFixed(2)}</p>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">Total Trades</p>
          <p className="text-2xl font-bold text-blue-400">{statistics?.totalTrades}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">Win Rate</p>
          <p className="text-2xl font-bold text-green-400">{statistics?.winRate}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">Total Profit</p>
          <p className="text-2xl font-bold text-green-400">${statistics?.totalProfit?.toFixed(2)}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">Total Loss</p>
          <p className="text-2xl font-bold text-red-400">${statistics?.totalLoss?.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
