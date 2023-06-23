const mongoose = require('mongoose');
const RoomSchema = new mongoose.Schema({
    
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  });
  
  const Room = mongoose.model('Room', RoomSchema);
  module.exports = Room;