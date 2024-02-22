const express = require('express');
const router = express.Router();

const providersController = require('../controllers/providers');

router.get('/', providersController.getAll);

router.get('/:id', providersController.getSingle);

router.post('/', providersController.createprovider);

router.put('/:id', providersController.updateprovider);

router.delete('/:id', providersController.deleteprovider);

module.exports = router;