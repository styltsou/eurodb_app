const db = require('../db/connect');
const catchAsync = require('../utils/catchAsync');

const getCountryMostWins = catchAsync(async (req, res, next) => {
  const query = `select * from alltime_mostwins_view`;

  const [rows] = await db.query(query);

  res.status(200).json({
    status: 'success',
    results: rows.length,
    data: rows,
  });
});

module.exports = {
  getCountryMostWins,
};
