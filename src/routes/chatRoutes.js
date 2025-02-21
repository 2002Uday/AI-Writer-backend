const express = require("express");
const chatRouter = express.Router();
const mongoose = require('mongoose');
const { saveChat } = require("../controllers/chatController");
const authMiddleware = require("../middleware/authMiddleware");

chatRouter.post("/save", authMiddleware, saveChat);

module.exports = chatRouter;