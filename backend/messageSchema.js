const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  });
  
  const Join = mongoose.model('Join', messageSchema);
  module.exports = Join;

  