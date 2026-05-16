import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TradeJournal = () => {
  const [trades, setTrades] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrades();
  }, [filter]);

  const fetchTrades = async () => {
    try {
      const userId = localStorage.getItem('userId');
      
      // Fetch trades
      const tradesRes = await axios.get(`/api/trades/user/${userId}`);
      let filteredTrades = tradesRes.data;
      
      if (filter !== 'all') {
        filteredTrades = filteredTrades.filter(t => t.status === filter);
      }
      setTrades(filteredTrades);

      // Fetch analytics
      const analyticsRes = await axios.get(`/api/trades/user/${userId}/analytics`);
      setAnalytics(analyticsRes.data);

      setLoading(false);
    } catch (err) {
      console.error('Error fetching trades:', err);
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-8">Loading trade journal...</div>;

  return (
    <div className="container mx-auto p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Trade Journal</h1>

      {/* Analytics Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">Total Trades</p>
          <p className="text-2xl font-bold text-blue-400">{analytics?.totalTrades}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">Win Rate</p>
          <p className="text-2xl font-bold text-green-400">{analytics?.winRate}%</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">Profit Factor</p>
          <p className="text-2xl font-bold text-blue-400">{analytics?.profitFactor}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">Net Profit</p>
          <p className="text-2xl font-bold text-green-400">${(analytics?.totalProfit - analytics?.totalLoss)?.toFixed(2)}</p>
        </div>
      </div>

      {/* Filter */}
      <div className="mb-6 flex gap-2">
        {['all', 'open', 'closed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === f
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Trades Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-700">
              <tr>
                <th className="text-left p-4">Pair</th>
                <th className="text-left p-4">Type</th>
                <th className="text-left p-4">Entry</th>
                <th className="text-left p-4">Exit</th>
                <th className="text-left p-4">P/L</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Strategy</th>
              </tr>
            </thead>
            <tbody>
              {trades.map(trade => (
                <tr key={trade._id} className="border-b border-gray-700 hover:bg-gray-750">
                  <td className="p-4 font-semibold">{trade.currencyPair}</td>
                  <td className={`p-4 ${trade.tradeType === 'BUY' ? 'text-green-400' : 'text-red-400'}`}>
                    {trade.tradeType}
                  </td>
                  <td className="p-4">${trade.entryPrice.toFixed(4)}</td>
                  <td className="p-4">{trade.exitPrice ? `$${trade.exitPrice.toFixed(4)}` : '-'}</td>
                  <td className={`p-4 font-bold ${trade.profitLoss > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    ${trade.profitLoss?.toFixed(2)}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      trade.status === 'closed'
                        ? 'bg-blue-600'
                        : 'bg-yellow-600'
                    }`}>
                      {trade.status}
                    </span>
                  </td>
                  <td className="p-4">{trade.strategy || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TradeJournal;
