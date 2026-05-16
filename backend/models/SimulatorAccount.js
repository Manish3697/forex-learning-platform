const mongoose = require('mongoose');

const simulatorAccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  initialBalance: {
    type: Number,
    required: true,
    default: 10000
  },
  currentBalance: {
    type: Number,
    required: true,
    default: 10000
  },
  totalTrades: {
    type: Number,
    default: 0
  },
  winningTrades: {
    type: Number,
    default: 0
  },
  losingTrades: {
    type: Number,
    default: 0
  },
  totalProfit: {
    type: Number,
    default: 0
  },
  totalLoss: {
    type: Number,
    default: 0
  },
  netProfit: {
    type: Number,
    default: 0
  },
  winRate: {
    type: Number,
    default: 0
  },
  profitFactor: {
    type: Number,
    default: 0
  },
  maxDrawdown: {
    type: Number,
    default: 0
  },
  largestWin: {
    type: Number,
    default: 0
  },
  largestLoss: {
    type: Number,
    default: 0
  },
  averageWin: {
    type: Number,
    default: 0
  },
  averageLoss: {
    type: Number,
    default: 0
  },
  openTrades: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  resetAt: Date
}, { timestamps: true });

module.exports = mongoose.model('SimulatorAccount', simulatorAccountSchema);
