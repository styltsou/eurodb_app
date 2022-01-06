const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');

const db = require('./db/connect');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(xss());

// Add rate limit middleware
app.get('/', async (req, res) => {
  const query = `select * from alltime_mostwins_view`;

  try {
    const [rows] = await db.query(query);

    res.status(200).json({
      status: 'success',
      results: rows.length,
      data: rows,
    });
  } catch (err) {
    res.send(err);
  }
});

module.exports = app;
