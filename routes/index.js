const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello World');
});

router.use('/appointments', require('./appointments'));
router.use('/locations', require('./locations'));
router.use('/patients', require('./patients'));
router.use('/providers', require('./providers'));

module.exports= router;