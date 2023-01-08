const router = require('express').Router()

const slider = require('../controllers/slider');

router.post('/', slider.addSlider);
router.get('/', slider.getAllSliders);
router.delete('/:id', slider.deleteSlider);

module.exports = router;