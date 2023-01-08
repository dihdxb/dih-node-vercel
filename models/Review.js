const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String, 
    required: true
  },
  name: {
    type: String, 
    required: true
  },
  place: {
    type: String, 
    required: true
  },
  data: {
    type: String, 
    required: true
  },
});

module.exports = Review = mongoose.model('review', ReviewSchema);