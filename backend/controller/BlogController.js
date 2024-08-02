const cloudinary = require('cloudinary').v2;
const uploadImageFromBase64 = require('./imageUpload');
const Blog = require('../model/Blog');

exports.createBlog = async (req, res) => {
  try {
    const { category, name, username, description, detailedDescription, image } = req.body;

    if (!category || !name || !username || !description || !detailedDescription || !image) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const newBlog = new Blog({
        category,
        name,
        username,
        description,
        detailedDescription,
        image 
    });

    await newBlog.save();

    res.status(200).json({ success: true, message: 'Blog created successfully!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'An error occurred while creating the blog.' });
  }
};



// Delete a blog by ID
exports.deleteBlog = async (req, res) => {
  try {
      const { id } = req.params;

      // Find and delete the blog by its ID
      const deletedBlog = await Blog.findByIdAndDelete(id);

      // If the blog was not found, return a 404 error
      if (!deletedBlog) {
          return res.status(404).json({ message: 'Blog not found' });
      }

      // Return a success message
      res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
      // Handle any errors that occur during the deletion
      console.error('Error deleting blog:', error);
      res.status(500).json({ message: 'An error occurred while deleting the blog' });
  }
};


exports.getBlogs = async (req, res) => {
  try {
    // Extract the category from query parameters
    const category = req.query.category;

    let filter = {};
    if (category) {
      filter.category = category;
    }

    // Fetch the latest two blog posts in ascending order (oldest first) based on the category
    const latestTwoBlogs = await Blog.find(filter).sort({ createdAt: -1 });


    res.status(200).json({
      success: true,
      data: latestTwoBlogs
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};
