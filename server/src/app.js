const path = require('path');
const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');

const { NODE_ENV } = require('../config/env');

const contestRouter = require('./routes/contestRouter');
const countryRouter = require('./routes/countryRouter');
const trackRouter = require('./routes/trackRouter');
const presenterRouter = require('./routes/presenterRouter');
const jurorRouter = require('./routes/jurorRouter');
const performerRouter = require('./routes/performerRouter');

const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(helmet());
app.use(xss());

//NOTE: Add rate limiting middleware

app.use('/api/contests', contestRouter);
app.use('/api/countries', countryRouter);
app.use('/api/tracks', trackRouter);
app.use('/api/presenters', presenterRouter);
app.use('/api/jurors', jurorRouter);
app.use('/api/performers', performerRouter);

app.use(globalErrorHandler);

if (NODE_ENV === 'production') {
  const CLIENT_BUILD_PATH = path.resolve(__dirname, '../../client/build');
  app.use(express.static(CLIENT_BUILD_PATH));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(CLIENT_BUILD_PATH, 'index.html'));
  });
}

module.exports = app;
