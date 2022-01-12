const db = require('../db/connect');
const catchAsync = require('../utils/catchAsync');
const { insertQuery, updateQuery } = require('../db/queryFactory');
const { validateGender } = require('../db/validateEnums');

const getAllJurors = catchAsync(async (req, res, next) => {
  // Might need to add a join here
  const query = 'SELECT * FROM juror';

  const [rows] = await db.query(query);

  res.status(200).json({
    status: 'success',
    results: rows.length,
    data: rows,
  });
});

// Implement filter by country
const getJurorsByYear = catchAsync(async (req, res, next) => {
  const year = req.params.year;

  const idsQuery = `SELECT Juror_juror_id as id FROM contest_has_juror WHERE Contest_year = ${year}`;
  let [ids] = await db.query(idsQuery);

  if (ids) ids = ids.map(el => el['id']);
  else throw new Error('Resource not found');

  const jurorsQuery = `SELECT * FROM juror WHERE juror_id in (${ids.join(
    ','
  )})`;

  const [jurors] = await db.query(jurorsQuery);

  res.status(200).json({
    status: 'success',
    results: jurors.length,
    data: jurors,
  });
});

const getJurorsByCountry = catchAsync(async (req, res, next) => {
  const country = req.params.country;

  const query = `SELECT * FROM juror WHERE country_name = '${country}'`;

  const [rows] = await db.query(query);

  res.status(200).json({
    status: 'success',
    results: rows.length,
    data: rows,
  });
});

const getJuror = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const query = `SELECT * FROM juror WHERE juror_id = ${id}`;
  const [juror] = await db.query(query);

  const yearsQuery = `SELECT Contest_year as year FROM contest_has_juror WHERE Juror_juror_id = ${id}`;
  let [years] = await db.query(yearsQuery);

  // Create an array containing the years as single values
  if (years) {
    years = years.map(el => el['year']);
  }

  if (juror[0] === undefined) throw new Error('Resource not found');

  res.status(200).json({
    status: 'success',
    data: {
      ...juror[0],
      years,
    },
  });
});

const addJuror = catchAsync(async (req, res, next) => {
  const { gender, years } = req.body;

  validateGender(gender);

  // Remove years from request body before inserting data to juror
  delete req.body[years];

  const query = insertQuery(
    'juror',
    ['juror_name', 'gender', 'date_of_birth', 'country_name'],
    req.body
  );

  const [result] = await db.query(query);

  // Get the new entry's id
  const id = result.insertId;

  if (years) {
    valueLists = [];
    years.forEach(year => {
      valueLists.push(`(${year}, ${id})`);
    });

    const yearsQuery = `INSERT INTO contest_has_juror (Contest_year, Juror_juror_id)
      VALUES ${valueLists.join(', ')}`;

    [rows] = await db.query(yearsQuery);
  }

  res.status(200).json({
    status: 'success',
    data: result,
  });
});

const updateJuror = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const { gender } = req.body;
  validateGender(gender);

  // TODO: Update contest_has_juror table first

  const query = updateQuery(
    'juror',
    ['juror_name', 'gender', 'date_of_birth', 'country_name'],
    req.body,
    `juror_id = ${id}`
  );

  const [result] = await db.query(query);

  if (result.affectedRows === 0) throw new Error('Resource not found');

  res.status(200).json({
    status: 'success',
    data: result,
  });
});

const deleteJuror = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  /* 
    Delete all related entries from contest_has_juror table (if exist)
    before delete the actual Juror entity
    */
  const deleteYearQuery = `DELETE FROM contest_has_juror WHERE Juror_juror_id = ${id}`;
  const [yearResult] = await db.query(deleteYearQuery);

  const query = `DELETE FROM juror WHERE juror_id = ${id}`;
  const [result] = await db.query(query);

  if (result.affectedRows === 0) throw new Error('Resource not found');

  res.status(200).json({
    status: 'success',
    data: result,
  });
});

module.exports = {
  getAllJurors,
  getJurorsByYear,
  getJurorsByCountry,
  getJuror,
  addJuror,
  updateJuror,
  deleteJuror,
};
