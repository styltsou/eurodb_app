const db = require('../db/connect');
const catchAsync = require('../utils/catchAsync');
const { insertQuery, updateQuery } = require('../db/queryFactory');
const { validateGender } = require('../db/validateEnums');

const getPerformersByYear = catchAsync(async (req, res, next) => {
  const query = `SELECT performer.perf_id, perf_name, country_name, num_of_members, date_of_birth, gender 
                FROM track JOIN performer
                ON track.perf_id = performer.perf_id WHERE year = 2014;`;

  const [rows] = await db.query(query);

  res.status(200).json({
    status: 'success',
    results: rows.length,
    data: rows,
  });
});

const getPerformer = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const query = `SELECT * from performer WHERE perf_id = ${id}`;

  const [performer] = await db.query(query);

  if (performer[0] === undefined) throw new Error('Resource not found');

  res.status(200).json({
    status: 'success',
    data: performer,
  });
});

const getPerformerTracks = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const query = `SELECT * FROM track WHERE perf_id = ${id}`;

  const [tracks] = await db.query(query);

  res.status(200).json({
    status: 'success',
    results: tracks.length,
    data: tracks,
  });
});

const addPerformer = catchAsync(async (req, res, next) => {
  const { gender } = req.body;

  validateGender(gender);

  const query = insertQuery(
    'performer',
    ['perf_name', 'num_of_members', 'date_of_birth', 'gender'],
    req.body
  );

  const [result] = await db.query(query);

  res.status(200).json({
    status: 'success',
    data: result,
  });
});

const updatePerformer = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const { gender } = req.body;
  validateGender(gender);

  const query = updateQuery(
    'performer',
    ['perf_name', 'num_of_members', 'date_of_birth', 'gender'],
    req.body,
    `perf_id = ${id}`
  );

  const [result] = await db.query(query);

  if (result.affectedRows === 0) throw new Error('Resource not found');

  res.status(200).json({
    status: 'success',
    data: result,
  });
});

const deletePerformer = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const query = `DELETE FROM performer WHERE perf_id = ${id}`;

  const [result] = await db.query(query);

  if (result.affectedRows === 0) throw new Error('Resource not found');

  res.status(200).json({
    status: 'success',
    data: result,
  });
});

module.exports = {
  getPerformersByYear,
  getPerformer,
  getPerformerTracks,
  addPerformer,
  updatePerformer,
  deletePerformer,
};
