const db = require('../db/connect');
const catchAsync = require('../utils/catchAsync');

const getAllContests = catchAsync(async (req, res, next) => {});

const getContest = catchAsync(async (req, res) => {
  const year = req.params.year;

  const query =
    'SELECT contest.year, org_country, tv_viewing, num_of_contestants_view.num_contestants, winners_view.winner \
    FROM contest JOIN num_of_contestants_view JOIN winners_view \
    ON contest.year = num_of_contestants_view.year AND contest.year = winners_view.year \
    WHERE contest.year = ?';

  //NOTE: Might need to refactor this
  // Maybe throw an error instead?
  if (contest[0] === undefined) {
    res.status(404).json({ status: 'fail', message: 'No results found' });
    return;
  }

  const [rows] = await db.query(query, [year]);

  res.status(200).json({
    status: 'success',
    data: rows,
  });
});

module.exports = {
  getAllContests,
  getContest,
};
