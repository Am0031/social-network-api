const { User } = require("../models");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate("friends");

    return res.json({ data: users });
  } catch (error) {
    console.log(`[ERROR]: Failed to get all users | ${error.message}`);
  }
};
const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false });
    }

    return res.json({ data: user });
  } catch (error) {
    console.log(`[ERROR]: Failed to get user by id | ${error.message}`);
  }
};
const createUser = async (req, res) => {
  try {
    const { username, email } = req.body;

    const newUserData = { username, email };

    const user = await User.create(newUserData);

    if (!user) {
      return res.status(404).json({ success: false });
    }

    return res.json({ message: "User successfully created", data: user });
  } catch (error) {
    console.log(`[ERROR]: Failed to create user | ${error.message}`);
  }
};

const updateUserById = async (req, res) => {
  return res.json({ message: "updating user" });
};
const deleteUserById = async (req, res) => {
  return res.json({ message: "deleting user" });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
