const userModel = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Register New Business
const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const result = await userModel.create({
      email: email,
      password: hashedPassword,
      username: username,
    });

    // Create Token
    const token = jwt.sign(
      { email: result.email, _id: result._id },
      process.env.TOKEN_SECRET
    );

    res.status(201).json({
      message: "User created successfully",
      token: token,
      user: result,
    });
  } catch (error) {
    res.json({ message: error.message, status: 500 });
  }
};

// Login Business
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // if Userexist
    const User = await userModel.findOne({ email: email });
    if (!User) {
      return res.status(400).json({ message: "User Does not Exists!" });
    }

    // Check Password is Valid
    const validPassword = await bcryptjs.compare(password, User.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Incorrect Email or Password" });
    }

    // Generate Token
    const token = jwt.sign(
      { _id: User._id, email: User.email },
      process.env.TOKEN_SECRET,
      { expiresIn: "30d" }
    );

    res.status(200).json({
      message: "User Loggedin successfully",
      token: token,
    });
  } catch (error) {
    res.json({ message: error.message, status: 500 });
  }
};

module.exports = {
  signup,
  login,
};
