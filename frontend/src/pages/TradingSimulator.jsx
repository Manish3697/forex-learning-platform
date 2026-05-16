import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TradingSimulator = () => {
  const [account, setAccount] = useState(null);
  const [tradeForm, setTradeForm] = useState({
    tradeType: 'BUY',
    currencyPair: 'EUR/USD',
    entryPrice: 1.0800,
    quantity: 1,
    stopLoss: 1.0750,
    takeProfit: 1.0850
  });
  const [openTrades, setOpenTrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccount();
  }, []);

  const fetchAccount = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const res = await axios.get(`/api/simulator/${userId}`);
      setAccount(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching account:', err);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTradeForm(prev => ({
      ...prev,
      [name]: isNaN(value) ? value : parseFloat(value)
    }));
  };

  const executeTrade = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      const res = await axios.post(`/api/simulator/${userId}/trade`, tradeForm);
      setAccount(res.data.account);
      setTradeForm({
        ...tradeForm,
        entryPrice: 1.0800,
        stopLoss: 1.0750,
        takeProfit: 1.0850
      });
      // Fetch open trades
      const tradesRes = await axios.get(`/api/trades/user/${userId}`);
      setOpenTrades(tradesRes.data.filter(t => t.status === 'open'));
    } catch (err) {
      console.error('Error executing trade:', err);
    }
  };

  if (loading) return <div className="text-center p-8">Loading simulator...</div>;

  return (
    <div className="container mx-auto p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Trading Simulator</h1>

      {/* Account Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">Balance</p>
          <p className="text-2xl font-bold text-green-400">${account?.currentBalance?.toFixed(2)}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">Net Profit</p>
          <p className="text-2xl font-bold text-blue-400">${account?.netProfit?.toFixed(2)}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">Win Rate</p>
          <p className="text-2xl font-bold text-blue-400">{account?.winRate}%</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">Open Trades</p>
          <p className="text-2xl font-bold text-yellow-400">{account?.openTrades}</p>
        </div>
      </div>

      {/* Trade Form */}
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">Execute Trade</h2>
        <form onSubmit={executeTrade} className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Type</label>
            <select
              name="tradeType"
              value={tradeForm.tradeType}
              onChange={handleInputChange}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
            >
              <option>BUY</option>
              <option>SELL</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Currency Pair</label>
            <input
              type="text"
              name="currencyPair"
              value={tradeForm.currencyPair}
              onChange={handleInputChange}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Entry Price</label>
            <input
              type="number"
              name="entryPrice"
              value={tradeForm.entryPrice}
              onChange={handleInputChange}
              step="0.0001"
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={tradeForm.quantity}
              onChange={handleInputChange}
              min="0.01"
              step="0.01"
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Stop Loss</label>
            <input
              type="number"
              name="stopLoss"
              value={tradeForm.stopLoss}
              onChange={handleInputChange}
              step="0.0001"
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Take Profit</label>
            <input
              type="number"
              name="takeProfit"
              value={tradeForm.takeProfit}
              onChange={handleInputChange}
              step="0.0001"
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
            />
          </div>
          <button
            type="submit"
            className="col-span-2 md:col-span-3 bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold transition"
          >
            Execute Trade
          </button>
        </form>
      </div>

      {/* Open Trades */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Open Trades</h2>
        {openTrades.length === 0 ? (
          <p className="text-gray-400">No open trades</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-600">
                <tr>
                  <th className="text-left py-2">Pair</th>
                  <th className="text-left py-2">Type</th>
                  <th className="text-left py-2">Entry</th>
                  <th className="text-left py-2">SL</th>
                  <th className="text-left py-2">TP</th>
                </tr>
              </thead>
              <tbody>
                {openTrades.map(trade => (
                  <tr key={trade._id} className="border-b border-gray-700">
                    <td className="py-2">{trade.currencyPair}</td>
                    <td className={trade.tradeType === 'BUY' ? 'text-green-400' : 'text-red-400'}>{trade.tradeType}</td>
                    <td>${trade.entryPrice.toFixed(4)}</td>
                    <td>${trade.stopLoss?.toFixed(4)}</td>
                    <td>${trade.takeProfit?.toFixed(4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TradingSimulator;
