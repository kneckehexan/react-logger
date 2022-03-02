require('dotenv').config();
require('express-async-errors');

// Security
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const path = require('path');
const express = require('express');
const app = express();

// connect DB
const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication');

// routers
const authRouter = require('./routes/auth');
const logRouter = require('./routes/log');
const entryRouter = require('./routes/entry');

// error handler
const notFoundMiddleWare = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
//const { dirname } = require('path/posix');

app.set('trust proxy', 1);
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit eac ip to 100 requests per windowMs
}));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.use(express.static(__dirname));

// routes
app.use('/api/v1/auth', authRouter); // authenticate
app.use('/api/v1/logs', authenticateUser, logRouter); // authenticate
app.use('/api/v1/entry', authenticateUser, entryRouter); // authenticate

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
} else if(process.env.NODE_ENV === 'development') {
  app.use(express.static(path.join(__dirname, 'client/src')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client'))
  })
}

app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleware);

// port
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
    })
  } catch (error) {
    console.error(error);
  }
}

start();