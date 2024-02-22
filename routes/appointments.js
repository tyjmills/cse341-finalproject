const express = require('express');
const router = express.Router();

const appointmentsController = require('../controllers/appointments');

router.get('/', appointmentsController.getAll);

router.get('/:id', appointmentsController.getSingle);

router.post('/', appointmentsController.createappointment);

router.put('/:id', appointmentsController.updateappointment);

router.delete('/:id', appointmentsController.deleteappointment);

module.exports = router;