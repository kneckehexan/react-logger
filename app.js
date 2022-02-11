require('dotenv').config();
require('express-asyn-errors');

// Security
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const express = require('express');
const app = express();

// connect DB
const connectDB = require('');
const authenticateUser = require('');

// routers
const authRouter = require('');
const logRouter = require('');

// error handler
const notFoundMiddleWare = require('');
const errorHandlerMiddleware = require('');

app.set('trust proxy', 1);
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit eac ip to 100 requests per windowMs
}));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.use(''); // authenticate
app.use(''); // log route

// port
const port = process.env.PORT || 3000;

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