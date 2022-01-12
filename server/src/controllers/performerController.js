const db = require('../db/connect');
const catchAsync = require('../utils/catchAsync');
const { insertQuery, updateQuery } = require('../db/queryFactory');

const getAllPerformers = catchAsync(async (req, res, next) => {});

module.exports = {
  getAllPerformers,
};
