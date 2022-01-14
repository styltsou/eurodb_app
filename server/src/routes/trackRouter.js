const express = require('express');

const router = express.Router();

const trackController = require('../controllers/trackController');

router
  .route('/')
  .get(trackController.getAllTracks)
  .post(trackController.addTrack);

router
  .route('/:year/country_name/:track_name')
  .get(trackController.getTrack)
  .patch(trackController.updateTrack)
  .delete(trackController.deleteTrack);

router.get('/:year', trackController.getTracksByYear);

router.get('/top-10', trackController.getTracksAtTopTen);

router.get('/all-time-top', trackController.getAllTimeTopTracks);

module.exports = router;
