const router = require('express').Router()

const review = require('../controllers/review');

router.post('/', review.addReview);
router.get('/', review.getAllReviews);
router.delete('/:id', review.deleteReview);

module.exports = router;