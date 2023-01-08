const router = require('express').Router()

const contactForm = require('../controllers/form');

router.post('/', contactForm.submitForm);
router.get('/', contactForm.getForms);

module.exports = router;