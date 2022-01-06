const express = require('express');
const countryController = require('../controllers/countryController');

const router = express.Router();

router.get('/most-wins', countryController.getCountryMostWins);

module.exports = router;
