const db = require('../db/connect');
const catchAsync = require('../utils/catchAsync');

const getContest = catchAsync(async (req, res) => {
  const year = req.params.year;

  const query =
    'SELECT contest.year, org_country, tv_viewing, num_of_contestants_view.num_contestants, winners_view.winner \
    FROM contest JOIN num_of_contestants_view JOIN winners_view \
    ON contest.year = num_of_contestants_view.year AND contest.year = winners_view.year \
    WHERE contest.year = ?';

  const [contest] = await db.query(query, [year]);

  if (contest[0] === undefined) throw new Error('Resource not found');

  res.status(200).json({
    status: 'success',
    data: contest,
  });
});

module.exports = {
  getContest,
};
