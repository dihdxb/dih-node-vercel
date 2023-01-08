const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true
  },
  email: {
    type: String,
  },
  country: {
    type: String, 
    required: true
  },
  phone: {
    type: String, 
    required: true
  },
  city: {
    type: String, 
    required: true
  },
  subject: {
    type: String, 
    required: true
  },
  message: {
    type: String, 
    required: true
  }
});

module.exports = Form = mongoose.model('form', FormSchema);