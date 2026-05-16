const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tradeType: {
    type: String,
    enum: ['BUY', 'SELL'],
    required: true
  },
  currencyPair: {
    type: String,
    required: true,
    example: 'EUR/USD'
  },
  entryPrice: {
    type: Number,
    required: true
  },
  exitPrice: Number,
  quantity: {
    type: Number,
    required: true
  },
  stopLoss: Number,
  takeProfit: Number,
  entryTime: {
    type: Date,
    required: true
  },
  exitTime: Date,
  duration: Number, // in minutes
  status: {
    type: String,
    enum: ['open', 'closed', 'cancelled'],
    default: 'open'
  },
  profitLoss: {
    type: Number,
    default: 0
  },
  profitLossPercentage: {
    type: Number,
    default: 0
  },
  riskRewardRatio: Number,
  strategy: String,
  notes: String,
  emotionalState: {
    type: String,
    enum: ['confident', 'neutral', 'anxious', 'excited', 'uncertain'],
    default: 'neutral'
  },
  lessonsLearned: String,
  isSimulator: {
    type: Boolean,
    default: true
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

// Calculate profit/loss before saving
tradeSchema.pre('save', function(next) {
  if (this.exitPrice) {
    if (this.tradeType === 'BUY') {
      this.profitLoss = (this.exitPrice - this.entryPrice) * this.quantity;
      this.profitLossPercentage = ((this.exitPrice - this.entryPrice) / this.entryPrice) * 100;
    } else if (this.tradeType === 'SELL') {
      this.profitLoss = (this.entryPrice - this.exitPrice) * this.quantity;
      this.profitLossPercentage = ((this.entryPrice - this.exitPrice) / this.entryPrice) * 100;
    }
  }
  next();
});

module.exports = mongoose.model('Trade', tradeSchema);
