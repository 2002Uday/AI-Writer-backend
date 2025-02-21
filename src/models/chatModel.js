const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema({
  role: { type: String, required: true },
  content: { type: String, required: true }
});

const ChatSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
  messages: { type: [ChatMessageSchema], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', ChatSchema);
