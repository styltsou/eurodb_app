const express = require('express');
const router = express.Router();

const performerController = require('../controllers/performerController');

router.route('/').get(performerController.getAllPerformers);

module.exports = router;
