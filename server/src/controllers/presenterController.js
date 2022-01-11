const db = require('../db/connect');
const catchAsync = require('../utils/catchAsync');
const prepareUpdateQuery = require('../db/prepareUpdateQuery');

const getAllPresenters = catchAsync(async (req, res, next) => {
  const query = `SELECT * FROM presenter`;

  const [rows] = await db.query(query);

  res.status(200).json({
    status: 'success',
    results: rows.length,
    data: rows,
  });
});

const getPresentersByYear = catchAsync(async (req, res, next) => {
  const year = req.params.year;

  const query = `SELECT * FROM presenter WHERE year = ${year}`;

  const [rows] = await db.query(query);

  res.status(200).json({
    status: 'success',
    results: rows.length,
    data: rows,
  });
});

// Things break if a add a year that doesn't exist in any row of contest table
const addPresenter = catchAsync(async (req, res, next) => {
  const { year, name, gender, date_of_birth } = req.body;

  const query = `INSERT INTO presenter 
                VALUES (${year}, '${name}', '${gender}', '${date_of_birth}')`;

  const [result] = await db.query(query);

  res.status(201).json({
    status: 'success',
    data: result,
  });
});

const updatePresenter = catchAsync(async (req, res, next) => {
  let { year, name } = req.params;

  // Format name parameter
  name = name.replace('_', ' ');

  const query = prepareUpdateQuery(
    'presenter',
    ['year', 'name', 'gender', 'date_of_birth'],
    req.body,
    `year = ${year} AND name = '${name}'`
  );

  const [result] = await db.query(query);

  res.status(200).json({
    status: 'success',
    data: result,
  });
});

const deletePresentersByYear = catchAsync(async (req, res, next) => {
  const year = req.params.year;

  const query = `DELETE FROM presenter WHERE year = ${year}`;

  const [result] = await db.query(query);

  if (result.affectedRows === 0) {
    throw new Error('Resource not found');
  }

  res.status(200).json({
    status: 'success',
    data: result,
  });
});

const deletePresenter = catchAsync(async (req, res, next) => {
  let { year, name } = req.params;

  // Format name request parameter here
  name = name.replace('_', ' ');

  const query = `DELETE FROM presenter WHERE year = ${year} AND name = '${name}'`;

  const [result] = await db.query(query);

  if (result.affectedRows === 0) {
    throw new Error('Resource not found');
  }

  res.status(200).json({
    status: 'success',
    data: result,
  });
});

module.exports = {
  getAllPresenters,
  getPresentersByYear,
  addPresenter,
  updatePresenter,
  deletePresentersByYear,
  deletePresenter,
};
