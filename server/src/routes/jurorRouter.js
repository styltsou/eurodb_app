const express = require('express');
const router = express.Router();

const jurorController = require('../controllers/jurorController');

router
  .route('/')
  .get(jurorController.getAllJurors)
  .post(jurorController.addJuror);

router
  .route('/:id')
  .get(jurorController.getJuror)
  .patch(jurorController.updateJuror)
  .delete(jurorController.deleteJuror);

router.get('/year/:year', jurorController.getJurorsByYear);

router.get('country/:country', jurorController.getJurorsByCountry);

module.exports = router;
