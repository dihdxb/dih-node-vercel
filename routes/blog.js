const router = require('express').Router()

const blog = require('../controllers/blog');

router.post('/', blog.createBlog);
router.get('/', blog.getBlogs);
router.delete('/:id', blog.deleteBlog);

module.exports = router;