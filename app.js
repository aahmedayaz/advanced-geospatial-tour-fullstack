require('dotenv').config();
const express = require('express');
const port = process.env.PORT | 3000;
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// Express App
const app = express();

// Middleware
app.use(express.json());
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Port Listening
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
