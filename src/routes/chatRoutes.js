const express = require("express");
const chatRouter = express.Router();
const mongoose = require("mongoose");
const {
  saveChat,
  getChats,
  getChatById,
  updateChat,
} = require("../controllers/chatController");
const authMiddleware = require("../middleware/authMiddleware");

chatRouter.post("/save", authMiddleware, saveChat);
chatRouter.get("/list", authMiddleware, getChats);
chatRouter.get("/:id", authMiddleware, getChatById);
chatRouter.put("/update/:id", authMiddleware, updateChat);

module.exports = chatRouter;
