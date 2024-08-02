const mongoose = require('mongoose');


const blogSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true, 
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  detailedDescription: {
    type: String,
    required: true, 
  },
  image: {
    type: String, 
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});


const Blog = mongoose.model('Blog', blogSchema);


module.exports = Blog;
