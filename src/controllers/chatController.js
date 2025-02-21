const express = require("express");
const Chat = require("../models/chatModel");
const router = express.Router();

// Save chat messages
const saveChat = async (req, res) => {
  try {
    const userId = req.user._id; // Get logged-in user ID from middleware

    // if (!userId) {
    //   return res.status(401).json({ error: "Unauthorized" });
    // }

    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res
        .status(400)
        .json({ error: "Messages array are required" });
    }

    // Check if a chat already exists for the user
    let chat = await Chat.findOne({ user: userId });

    if (chat) {
      // Append new messages to the existing chat
      chat.messages.push(...messages);
    } else {
      // Create a new chat
      chat = new Chat({ user: userId, messages });
    }

    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  saveChat,
};
