const path = require('path');
const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');

const { NODE_ENV } = require('../config/env');

const countryRouter = require('./routes/countryRouter');
const trackRouter = require('./routes/trackRouter');

const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(helmet());
app.use(xss());

//NOTE: Add rate limiting middleware

// Test route
app.get('/api', (req, res) => {
  re.json({ data: 'Node API' });
});

app.use('/api/countries', countryRouter);
app.use('/api/tracks', trackRouter);

app.use(globalErrorHandler);

if (NODE_ENV === 'production') {
  const CLIENT_BUILD_PATH = path.resolve(__dirname, '../../client/build');
  app.use(express.static(CLIENT_BUILD_PATH));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(CLIENT_BUILD_PATH, 'index.html'));
  });
}

module.exports = app;
