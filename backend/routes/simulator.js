const express = require('express');
const SimulatorAccount = require('../models/SimulatorAccount');
const Trade = require('../models/Trade');
const User = require('../models/User');
const router = express.Router();

// Get simulator account
router.get('/:userId', async (req, res) => {
  try {
    let account = await SimulatorAccount.findOne({ userId: req.params.userId });
    
    if (!account) {
      // Create default simulator account
      account = new SimulatorAccount({
        userId: req.params.userId,
        initialBalance: 10000,
        currentBalance: 10000
      });
      await account.save();
    }

    res.json(account);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Execute simulator trade
router.post('/:userId/trade', async (req, res) => {
  try {
    const { tradeType, currencyPair, entryPrice, quantity, stopLoss, takeProfit } = req.body;
    const userId = req.params.userId;

    let account = await SimulatorAccount.findOne({ userId });
    if (!account) {
      account = new SimulatorAccount({ userId });
      await account.save();
    }

    // Create trade
    const trade = new Trade({
      userId,
      tradeType,
      currencyPair,
      entryPrice,
      quantity,
      stopLoss,
      takeProfit,
      entryTime: new Date(),
      isSimulator: true
    });

    await trade.save();
    account.openTrades += 1;
    await account.save();

    res.status(201).json({ message: 'Simulator trade created', trade, account });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Close simulator trade
router.put('/:userId/trade/:tradeId/close', async (req, res) => {
  try {
    const { exitPrice } = req.body;
    const trade = await Trade.findById(req.params.tradeId);
    const account = await SimulatorAccount.findOne({ userId: req.params.userId });

    if (!trade) return res.status(404).json({ message: 'Trade not found' });

    trade.exitPrice = exitPrice;
    trade.exitTime = new Date();
    trade.status = 'closed';
    await trade.save();

    // Update account
    account.totalTrades += 1;
    account.currentBalance += trade.profitLoss;
    account.netProfit += trade.profitLoss;

    if (trade.profitLoss > 0) {
      account.winningTrades += 1;
      account.totalProfit += trade.profitLoss;
    } else {
      account.losingTrades += 1;
      account.totalLoss += Math.abs(trade.profitLoss);
    }

    account.winRate = ((account.winningTrades / account.totalTrades) * 100).toFixed(2);
    account.openTrades -= 1;
    await account.save();

    res.json({ message: 'Trade closed', trade, account });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Reset simulator
router.post('/:userId/reset', async (req, res) => {
  try {
    const account = await SimulatorAccount.findOne({ userId: req.params.userId });
    if (!account) return res.status(404).json({ message: 'Account not found' });

    account.currentBalance = account.initialBalance;
    account.totalTrades = 0;
    account.winningTrades = 0;
    account.losingTrades = 0;
    account.totalProfit = 0;
    account.totalLoss = 0;
    account.netProfit = 0;
    account.resetAt = new Date();

    await account.save();
    res.json({ message: 'Simulator account reset', account });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
