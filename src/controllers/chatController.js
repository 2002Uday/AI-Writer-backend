const express = require("express");
const Chat = require("../models/chatModel");
const router = express.Router();

// Save chat messages
const saveChat = async (req, res) => {
  try {
    const userId = req.user._id; // Get logged-in user ID from middleware

    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array are required" });
    }

    // Create a new chat
    const chat = new Chat({ user: userId, messages });

    await chat.save();
    res.status(201).json({ chat, message: "Chat saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all chat messages
const getChats = async (req, res) => {
  try {
    const userId = req.user._id; // Get logged-in user ID from middleware
    const chats = await Chat.find({ user: userId });
    if(!chats) {
      return res.status(404).json({ error: "No chats found" });
    }
    res.status(200).json({chats, message: "Chats found successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get chat messages by ID
const getChatById = async (req, res) => {
  try {
    const userId = req.user._id; // Get logged-in user ID from middleware
    const chatId = req.params.id;
    const chat = await Chat.findById(chatId);
    if(!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }
    res.status(200).json({chat, message: "Chat found successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update chat messages
const updateChat = async (req, res) => {
  try {
    const userId = req.user._id; // Get logged-in user ID from middleware
    const chatId = req.params.id;
    const { messages } = req.body;
    const chat = await Chat.findByIdAndUpdate(chatId, { messages }, { new: true });
    if(!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }
    res.status(200).json({chat, message: "Chat updated successfully" });
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  saveChat,
  getChats,
  getChatById,
  updateChat,
};
