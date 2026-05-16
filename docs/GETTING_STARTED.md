# Getting Started with Forex Learning Platform

## Installation & Setup

### Prerequisites
- Node.js 16 or higher
- MongoDB (local or cloud)
- npm or yarn
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/Manish3697/forex-learning-platform.git
cd forex-learning-platform
```

### Step 2: Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
PORT=5000
MONGODB_URI=mongodb://localhost:27017/forex-platform
JWT_SECRET=your_secret_key_here
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Start backend
npm run dev
```

### Step 3: Frontend Setup

```bash
cd ../frontend
npm install

# Start frontend
npm start
```

The application should now be running on `http://localhost:3000`

### Step 4 (Optional): Using Docker

```bash
docker-compose up
```

## First Steps in the Platform

### 1. Create Your Account
- Go to the registration page
- Enter your details
- Choose your experience level (Beginner)

### 2. Start Learning
- Go to the "Learn" section
- Start with "Forex Basics" course
- Complete the lessons in order
- Take the quizzes

### 3. Explore the Glossary
- Search for forex terms
- Filter by difficulty level
- Read detailed explanations

### 4. Practice with the Simulator
- Start with the trading simulator
- Practice with virtual money ($10,000 starting balance)
- Execute different types of trades
- Close trades and see your profit/loss

### 5. Keep a Trading Journal
- Log all your simulator trades
- Record your emotional state
- Note lessons learned
- Analyze your performance

## Recommended Learning Path

**Week 1-2: Fundamentals**
- Complete "What is Forex?" course
- Learn about currency pairs
- Understand market hours

**Week 3-4: Trading Basics**
- Learn how forex trading works
- Study trading accounts
- Practice reading charts

**Week 5-6: Technical Analysis**
- Study indicators
- Learn chart patterns
- Practice trend analysis

**Week 7-8: Risk Management & Psychology**
- Master position sizing
- Understand stop loss & take profit
- Learn trading psychology
- Study common mistakes

**Week 9+: Strategy Development**
- Build your trading strategy
- Backtest on the simulator
- Paper trade for 2-4 weeks
- Gradually transition to live trading

## API Endpoints Summary

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/profile/:id` - Get user profile
- `PUT /api/users/profile/:id` - Update profile
- `GET /api/users/:id/statistics` - Get trading statistics

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create course (admin)

### Trades
- `POST /api/trades` - Create trade
- `GET /api/trades/user/:userId` - Get user trades
- `PUT /api/trades/:id/close` - Close trade
- `GET /api/trades/user/:userId/analytics` - Get trade analytics

### Glossary
- `GET /api/glossary` - Get all terms
- `GET /api/glossary/search/:query` - Search terms
- `GET /api/glossary/term/:id` - Get single term

### Strategies
- `POST /api/strategies` - Create strategy
- `GET /api/strategies/user/:userId` - Get user strategies
- `GET /api/strategies/:id` - Get single strategy
- `PUT /api/strategies/:id` - Update strategy

### Simulator
- `GET /api/simulator/:userId` - Get simulator account
- `POST /api/simulator/:userId/trade` - Execute trade
- `PUT /api/simulator/:userId/trade/:tradeId/close` - Close trade
- `POST /api/simulator/:userId/reset` - Reset account

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify credentials

### Port Already in Use
- Change PORT in .env
- Or kill the process using the port

### CORS Errors
- Check CLIENT_URL in backend .env
- Ensure frontend URL matches

### Authentication Issues
- Check JWT_SECRET is set
- Verify token is being sent in headers

## Support & Resources

- GitHub Issues: Report bugs and request features
- Documentation: See `/docs` folder
- Community: Join our Discord for discussions

## Next Steps

1. Customize the learning content
2. Add real forex data feeds
3. Implement live trading
4. Add more advanced features
5. Deploy to production
