const router = require('express').Router()

const gallery = require('../controllers/gallery');

router.get('/', gallery.getImages);
router.post('/', gallery.addImage);
router.delete('/:id', gallery.deleteImage);

module.exports = router;