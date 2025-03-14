const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  messages: {
    type: Array,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Chat', ChatSchema); 