const db = require('../db/connect');
const catchAsync = require('../utils/catchAsync');

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

  // Too much spaghetti?
  //Filter by genre
  let { genre } = req.query;

  if (genre !== undefined) {
    //Find valid genre values

    /* Values could be hardcoded instead but 
    then adding extra values in genre enum would be a breaking change
    In the other hand we could avoid uneccessary db query
    */

    let genreValuesQuery = `
  SELECT  
      TRIM(TRAILING ")" FROM SUBSTRING(COLUMN_TYPE,6))  as enumVal 
  FROM 
      information_schema.COLUMNS
  WHERE  
      TABLE_NAME='track'
  AND
      COLUMN_NAME='genre'
`;

    const [genreVals] = await db.query(genreValuesQuery);

    const genreValues = genreVals[0]['enumVal'].replace(/\'/g, '').split(',');
    genre = genre.charAt(0).toUpperCase() + genre.slice(1);

    if (genreValues.includes(genre)) {
      query += ` AND genre = '${genre}'`;
      query = query.replace('track.genre,', ' ');
    }
    //NOTE: Use custom AppError class instead,
    else throw new Error(`No such genre as ${genre}`);
  }

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
  getTracksByYear,
  getTracksAtTopTen,
  getAllTimeTopTracks,
};
