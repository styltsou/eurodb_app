const express = require('express');
const router = express.Router();

const performerController = require('../controllers/performerController');

router
  .route('/')
  .get(performerController.getAllPerformers)
  .post(performerController.addPerformer);

router
  .route('/:id')
  .get(performerController.getPerformer)
  .patch(performerController.updatePerformer)
  .delete(performerController.deletePerformer);

router.get('/:id/tracks', performerController.getPerformerTracks);

module.exports = router;
