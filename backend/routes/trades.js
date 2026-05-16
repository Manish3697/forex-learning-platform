const express = require('express');
const Trade = require('../models/Trade');
const User = require('../models/User');
const router = express.Router();

// Create new trade
router.post('/', async (req, res) => {
  try {
    const { userId, tradeType, currencyPair, entryPrice, quantity, stopLoss, takeProfit, strategy, emotionalState } = req.body;
    
    const trade = new Trade({
      userId,
      tradeType,
      currencyPair,
      entryPrice,
      quantity,
      stopLoss,
      takeProfit,
      strategy,
      emotionalState,
      entryTime: new Date()
    });

    await trade.save();
    res.status(201).json({ message: 'Trade created', trade });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get user trades
router.get('/user/:userId', async (req, res) => {
  try {
    const trades = await Trade.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(trades);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Close trade
router.put('/:id/close', async (req, res) => {
  try {
    const { exitPrice } = req.body;
    const trade = await Trade.findById(req.params.id);
    
    if (!trade) return res.status(404).json({ message: 'Trade not found' });

    trade.exitPrice = exitPrice;
    trade.exitTime = new Date();
    trade.status = 'closed';
    trade.duration = Math.round((trade.exitTime - trade.entryTime) / 60000); // in minutes

    await trade.save();

    // Update user statistics
    const user = await User.findById(trade.userId);
    user.totalTrades += 1;
    
    if (trade.profitLoss > 0) {
      user.winningTrades += 1;
      user.totalProfit += trade.profitLoss;
    } else {
      user.losingTrades += 1;
      user.totalLoss += Math.abs(trade.profitLoss);
    }

    await user.save();

    res.json({ message: 'Trade closed', trade });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get trade analytics
router.get('/user/:userId/analytics', async (req, res) => {
  try {
    const trades = await Trade.find({ userId: req.params.userId, status: 'closed' });
    
    const analytics = {
      totalTrades: trades.length,
      winningTrades: trades.filter(t => t.profitLoss > 0).length,
      losingTrades: trades.filter(t => t.profitLoss < 0).length,
      totalProfit: trades.reduce((sum, t) => sum + (t.profitLoss > 0 ? t.profitLoss : 0), 0),
      totalLoss: trades.reduce((sum, t) => sum + (t.profitLoss < 0 ? Math.abs(t.profitLoss) : 0), 0)
    };
    
    analytics.winRate = analytics.totalTrades > 0 ? ((analytics.winningTrades / analytics.totalTrades) * 100).toFixed(2) : 0;
    analytics.profitFactor = analytics.totalLoss > 0 ? (analytics.totalProfit / analytics.totalLoss).toFixed(2) : 'N/A';

    res.json(analytics);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
