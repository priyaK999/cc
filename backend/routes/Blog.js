const express = require('express');
const router = express.Router();
const { createBlog, getBlogs, deleteBlog } = require('../controller/BlogController');



router.post('/blogs', createBlog);

router.get('/getBlog', getBlogs);

router.delete('/blogs/:id', deleteBlog);

module.exports = router;
