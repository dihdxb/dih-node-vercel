const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema({
  page: {
    type: String, 
    required: true
  },
  largeImage: {
    type: String, 
    required: true
  },
  mobileImage: {
    type: String, 
    required: true
  }
});

module.exports = Banner = mongoose.model('banner', BannerSchema);