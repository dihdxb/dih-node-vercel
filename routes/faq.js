const router = require('express').Router()

const faq = require('../controllers/faq');

router.post('/', faq.addFaq);
router.get('/', faq.getAllFaqs);
router.delete('/:id', faq.deleteFaq);

module.exports = router;