const db = require('../db/connect');
const catchAsync = require('../utils/catchAsync');
const { validateGenre } = require('../db/validateEnums');

const getAllTracks = catchAsync(async (req, res, next) => {
  const query = `SELECT track_name, year, country_name, genre, duration, track.perf_id as perf_id, perf_name as perf_name
   FROM track JOIN performer ON track.perf_id = performer.perf_id`;

  const [rows] = await db.query(query);

  res.status(200).json({
    status: 'success',
    results: rows.length,
    data: rows,
  });
});

const getTrack = catchAsync(async (req, res, next) => {
  const { year, country_name, track_name } = -req.params;

  const query = `SELECT * FROM track WHERE year = ${year}
   AND country_name = ${country_name} 
   AND track_name = ${track_name}`;

  const [track] = await db.query(query);

  if (track[0] === undefined) throw new Error('Resource not found');

  res.status(200).json({
    status: 'success',
    data: track,
  });
});

const addTrack = catchAsync(async (req, res, next) => {
  const { perf_id, genre } = req.body;

  if (genre) validateGenre;
  // The following check might be unnecessary
  if (perf_id) {
    // See if perf_id corresponds to a performer
    const perfQuery = `SELECT * FROM performer WHERE perf_id = ${id}`;
    const [performer] = await db.query(perfQuery);
    if (performer[0] === undefined)
      throw new Error(`${perf_id} is not a valid perf_id value`);
  }

  const query = insertQuery({
    table: 'track',
    validInserts: [
      'track_name',
      'year',
      'country_name',
      'genre',
      'duration',
      'perf_id',
    ],
    data: req.body,
  });

  const [result] = await db.query(query);

  res.status(200).json({
    status: 'success',
    data: result,
  });
});

const updateTrack = catchAsync(async (req, res, next) => {
  const { year, country_name, track_name } = req.params;

  // The following check might be unnecessary
  if (perf_id) {
    // See if perf_id corresponds to a performer
    const perfQuery = `SELECT * FROM performer WHERE perf_id = ${id}`;
    const [performer] = await db.query(perfQuery);
    if (performer[0] === undefined)
      throw new Error(`${perf_id} is not a valid perf_id value`);
  }

  const query = updateQuery({
    table: 'track',
    validUpdates: [
      'track_name',
      'year',
      'country_name',
      'genre',
      'duration',
      'perf_id',
    ],
    data: req.body,
    condition: `year = ${year}
  AND country_name = ${country_name} 
   AND track_name = ${track_name}`,
  });

  const [result] = await db.query(query);

  if (result.affectedRows === 0) throw new Error('Resource not found');

  res.status(200).json({
    status: 'success',
    data: result,
  });
});

const deleteTrack = catchAsync(async (req, res, next) => {
  const { year, country_name, track_name } = req.params;

  const query = `DELETE FROM track WHERE year = ${year}
   AND country_name = ${country_name} 
   AND track_name = ${track_name}`;

  const [track] = await db.query(query);

  if (track.affectedRows === 0) throw new Error('Resource not found');

  res.status(200).json({
    status: 'success',
    data: track,
  });
});

const getTracksByYear = catchAsync(async (req, res, next) => {
  const year = req.params.year;

  const query = `SELECT track_name as title, country_name as country, genre, duration, pref_id
                  FROM track WHERE year = ${year}`;

  const [rows] = await db.query(query);

  // Check for non valid year parameter

  res.status(200).json({
    status: 'success',
    results: rows.length,
    data: rows,
  });
});

const getTracksAtTopTen = catchAsync(async (req, res, next) => {
  let query = `SELECT cct.year, country, track.track_name as track, track.genre, place_view.place
                 FROM place_view JOIN cct JOIN track
                 ON place_view.year = cct.year AND place_view.country = cct.country_name
                 AND cct.year = track.year AND cct.country_name = track.country_name AND cct.track_name = track.track_name
                 AND place_view.place <= 10`;

  //Filter by genre
  let { genre } = req.query;

  if (genre !== undefined) validateGenre(genre);

  const [rows] = await db.query(query);

  res.status(200).json({
    status: 'success',
    results: rows.length,
    data: rows,
  });
});

const getAllTimeTopTracks = catchAsync(async (req, res, next) => {
  let query = 'SELECT * FROM alltime_top10tracks_view';

  // Add filter options for this controllers
  //i.e sortby

  const [rows] = await db.query(query);

  res.status(200).json({
    status: 'success',
    results: rows.length,
    data: rows,
  });
});

module.exports = {
  getAllTracks,
  getTrack,
  addTrack,
  updateTrack,
  deleteTrack,
  getTracksByYear,
  getTracksAtTopTen,
  getAllTimeTopTracks,
};
