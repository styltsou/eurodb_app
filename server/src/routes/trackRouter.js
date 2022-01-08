const express = require('express');

const router = express.Router();

const trackController = require('../controllers/trackController');

router.get('/top-10', trackController.getTracksAtTopTen);

module.exports = router;
