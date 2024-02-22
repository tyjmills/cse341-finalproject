const express = require('express');
const router = express.Router();

const locationsController = require('../controllers/locations');

router.get('/', locationsController.getAll);

router.get('/:id', locationsController.getSingle);

router.post('/', locationsController.createlocation);

router.put('/:id', locationsController.updatelocation);

router.delete('/:id', locationsController.deletelocation);

module.exports = router;