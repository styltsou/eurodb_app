const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');

const countryRouter = require('./routes/countryRouter');

const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(xss());

//NOTE: Add rate limiting middleware

app.get('/', (req, res) => res.send('<h1>Eimai Gkantemoskylo</h1>'));

app.use('/api/countries', countryRouter);

app.use(globalErrorHandler);

module.exports = app;
