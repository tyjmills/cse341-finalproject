const express = require('express');
const router = express.Router();

const patientsController = require('../controllers/patients');

router.get('/', patientsController.getAll);

router.get('/:id', patientsController.getSingle);

router.post('/', patientsController.createpatient);

router.put('/:id', patientsController.updatepatient);

router.delete('/:id', patientsController.deletepatient);

module.exports = router;