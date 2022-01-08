const express = require('express');

const router = express.Router();

const contestController = require('../controllers/contestController');

router.get('/:year', contestController.getContest);

module.exports = router;
