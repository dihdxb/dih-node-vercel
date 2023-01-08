const router = require('express').Router()

const banner = require('../controllers/banners');

router.post('/', banner.addBanner);
router.get('/', banner.getBanners);
//router.delete('/:id', blog.deleteBlog);

module.exports = router;