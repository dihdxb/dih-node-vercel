const mongoose = require('mongoose');

const FaqSchema = new mongoose.Schema({
  question: {
    type: String, 
    required: true
  },
  answer: {
    type: String, 
    required: true
  },
});

module.exports = Faq = mongoose.model('faq', FaqSchema);