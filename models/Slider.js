const mongoose = require('mongoose');

const SliderSchema = new mongoose.Schema({
  page: {
    type: String, 
    required: true
  },
  images: [{
    fileUrl: {
      type: String 
    }
  }],
});

module.exports = Slider = mongoose.model('slider', SliderSchema);