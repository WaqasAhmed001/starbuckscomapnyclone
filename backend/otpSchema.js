const mongoose = require('mongoose');
const otpSchema = new mongoose.Schema({
        phone: {
      type: String,
      required: true
    },
    otp: {
      type: String,
      required: true
    }
  });
  
  const Login = mongoose.model('Login', otpSchema);
  module.exports = Login;

  