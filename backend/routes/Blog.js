const express = require('express');
const router = express.Router();
const { createBlog, getBlogs, uploadImage } = require('../controller/BlogController');



router.post('/blogs', createBlog);

router.get('/getBlog', getBlogs);

router.post('/image', uploadImage);

router.delete('/deleteBlog', deleteBlog);

module.exports = router;
