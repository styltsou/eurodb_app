const express = require('express');

const router = express.Router();

const contestController = require('../controllers/contestController');

router
  .route('/:year')
  .post(contestController.addContest)
  .get(contestController.getContest)
  .patch(contestController.updateContest)
  .delete(contestController.deleteContest);

module.exports = router;
