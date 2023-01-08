const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String, 
    required: true
  },
  avatar: {
    type: String, 
  },
  data: {
    type: String, 
    required: true
  },
  createdOn: {
    type: String, 
    required: true
  }
});

module.exports = Blog = mongoose.model('blog', BlogSchema);