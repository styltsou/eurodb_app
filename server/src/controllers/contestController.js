const db = require('../db/connect');
const catchAsync = require('../utils/catchAsync');
const { insertQuery, updateQuery } = require('../db/queryFactory');

const addContest = catchAsync(async (req, res, next) => {
  const query = insertQuery({
    table: 'contest',
    validInserts: ['year', 'org_country', 'tv_viewing'],
    data: req.body,
  });

  const [result] = await db.query(query);

  res.status(201).json({
    status: 'success',
    data: result,
  });
});

const getContest = catchAsync(async (req, res) => {
  const year = req.params.year;

  const query = ` SELECT contest.year, org_country, tv_viewing, num_of_contestants_view.num_contestants, winners_view.winner, track.track_name, track.country_name, track.genre, track.duration, track.perf_id
  FROM contest JOIN num_of_contestants_view JOIN winners_view JOIN cct JOIN track
  ON contest.year = num_of_contestants_view.year AND contest.year = winners_view.year AND contest.year = cct.year
  AND cct.year = track.year AND cct.track_name = track.track_name AND cct.country_name = track.country_name
  WHERE contest.year = ${year}`;

  const [rows] = await db.query(query, [year]);

  if (rows[0] === undefined) throw new Error('Resource not found');

  // Format response tracks field for response object
  let tracks = [];
  rows.forEach(row => {
    tracks.push({
      track_name: row.track_name,
      country_name: row.country_name,
      genre: row.genre,
      duration: row.duration,
      perf_id: row.perf_id,
    });
  });

  res.status(200).json({
    status: 'success',
    data: {
      year: rows[0].year,
      org_country: rows[0].org_country,
      tv_viewing: rows[0].tv_viewing,
      num_contestants: rows[0].num_contestants,
      winner: rows[0].winner,
      tracks,
    },
  });
});

const updateContest = catchAsync(async (req, res, next) => {
  const year = req.params.year;

  const query = updateQuery({
    table: 'contest',
    validUpdates: ['year', 'org_country', 'tv_viewing'],
    data: req.body,
    condition: `year = ${year}`,
  });

  const [result] = await db.query(query);

  if (result.affectedRows === 0) throw new Error('Resource not found');

  res.status.json({
    status: 'success',
    data: result,
  });
});

const deleteContest = catchAsync(async (req, res, next) => {
  const year = req.params.year;

  const query = `DELETE FROM contest WHERE year = ${year}`;

  const [result] = await db.query(query);

  if (result.affectedRows === 0) throw new Error('Resource not found');

  res.status(200).json({
    status: 'success',
    data: result,
  });
});

module.exports = {
  addContest,
  getContest,
  updateContest,
  deleteContest,
};
