const db = require('../db/connect');
const catchAsync = require('../utils/catchAsync');

const getAllContests = catchAsync(async (req, res, next) => {});

const getContest = catchAsync(async (req, res) => {
  const year = req.params.year;

  const contestQuery = 'SELECT * FROM contest WHERE year = ?';
  const [contest] = await db.query(contestQuery, [year]);

  //NOTE: Might need to refactor this
  // Maybe throw an error instead?
  if (contest[0] === null || contest[0] === undefined) {
    res.status(404).json({ status: 'fail', message: 'No results found' });
    return;
  }

  const numContestantsQuery =
    'SELECT num_contestants FROM num_of_contestants_view WHERE year = ?';
  const [numContestants] = await db.query(numContestantsQuery, [year]);

  const winnerQuery = 'SELECT winner FROM winners_view WHERE year = ?';
  const [winner] = await db.query(winnerQuery, [year]);

  contest[0].winner = winner[0].winner;
  contest[0].num_of_contestants = numContestants[0].num_contestants;

  res.status(200).json({
    status: 'success',
    data: contest[0],
  });
});

module.exports = {
  getAllContests,
  getContest,
};
