const express = require('express');
const router = express.Router();

const presenterController = require('../controllers/presenterController');

router
  .route('/')
  .get(presenterController.getAllPresenters)
  .post(presenterController.addPresenter);

router
  .route('/:year')
  .get(presenterController.getPresentersByYear)
  .delete(presenterController.deletePresentersByYear);

router
  .route('/:year/:name')
  .patch(presenterController.updatePresenter)
  .delete(presenterController.deletePresenter);

module.exports = router;
