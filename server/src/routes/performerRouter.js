const express = require('express');
const router = express.Router();

const performerController = require('../controllers/performerController');

router.post('/', performerController.addPerformer);

router.get('/:year', performerController.getPerformersByYear);

router
  .route('/:id')
  .get(performerController.getPerformer)
  .patch(performerController.updatePerformer)
  .delete(performerController.deletePerformer);

router.get('/:id/tracks', performerController.getPerformerTracks);

module.exports = router;
