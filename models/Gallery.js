const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  category: {
    type: String, 
    required: true
  },
  imageUrl: {
    type: String, 
    required: true
  }
});

module.exports = Gallery = mongoose.model('gallery', GallerySchema);