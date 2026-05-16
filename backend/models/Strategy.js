const mongoose = require('mongoose');

const strategySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  category: {
    type: String,
    enum: ['scalping', 'dayTrading', 'swingTrading', 'positionTrading', 'custom'],
    required: true
  },
  entryRules: [{
    rule: String,
    indicator: String,
    value: String
  }],
  exitRules: [{
    rule: String,
    indicator: String,
    value: String
  }],
  stopLossRule: String,
  takeProfitRule: String,
  riskPerTrade: Number, // percentage
  maxDrawdown: Number,
  timeFrame: {
    type: String,
    enum: ['M1', 'M5', 'M15', 'M30', 'H1', 'H4', 'D1', 'W1'],
    default: 'H1'
  },
  currencyPairs: [String],
  backtestResults: {
    totalTrades: Number,
    winningTrades: Number,
    losingTrades: Number,
    winRate: Number,
    profitLoss: Number,
    profitFactor: Number,
    maxDrawdownPercent: Number
  },
  status: {
    type: String,
    enum: ['draft', 'testing', 'active', 'paused'],
    default: 'draft'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Strategy', strategySchema);
