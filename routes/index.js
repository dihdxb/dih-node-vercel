const router = require('express').Router();

router.use('/blog', require('./blog'));
router.use('/banner', require('./banners'));
router.use('/gallery', require('./gallery'));
router.use('/review', require('./review'));
router.use('/faq', require('./faq'));
router.use('/slider', require('./slider'));
router.use('/auth', require('./auth'));
router.use('/contact-form', require('./contact-form'));

module.exports = router;