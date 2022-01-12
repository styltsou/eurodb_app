const db = require('../db/connect');
const catchAsync = require('../utils/catchAsync');
const { insertQuery, updateQuery } = require('../db/queryFactory');
const { validateGender } = require('../db/validateEnums');

const getAllPerformers = catchAsync(async (req, res, next) => {});

const getPerformer = catchAsync(async (req, res, next) => {
  const id = req.params.id;
});

const getPerformerTracks = catchAsync(async (req, res, next) => {
  const id = req.params.id;
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

  res.status.json({
    status: 'success',
    data: result,
  });
});

const updatePerformer = catchAsync(async (req, res, next) => {
  const id = req.params.id;
});

const deletePerformer = catchAsync(async (req, res, next) => {
  const id = req.params.id;
});

module.exports = {
  getAllPerformers,
  getPerformer,
  getPerformerTracks,
  addPerformer,
  updatePerformer,
  deletePerformer,
};
