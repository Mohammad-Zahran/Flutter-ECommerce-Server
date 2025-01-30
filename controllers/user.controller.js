const User = require("../models/user.model.js");
const asyncHandler = require("express-async-handler");

// Register
const Register = asyncHandler(async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Name and password are required" });
  }

  try {
    const user = new User({ name, password });
    const newUser = await user.save();
    res.json({ success: true, message: "User created successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Login
const Login = asyncHandler(async (req, res) => {
  const { name, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ name });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid name or password." });
    }
    // Check if the password is correct
    if (user.password !== password) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid name or password." });
    }

    // Authentication successful
    res
      .status(200)
      .json({ success: true, message: "Login successful.", data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all users
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      success: true,
      message: "Users retrieved successfully.",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

const UpdateUser = asyncHandler(async (req, res) => {
  try {
    const userID = req.params.id;
    const { name, password } = req.body;
    if (!name || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Name,  and password are required." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userID,
      { name, password },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    res.json({
      success: true,
      message: "User updated successfully.",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = {
  Register,
  Login,
  getAllUsers,
  UpdateUser,
};
