const { User, Thought, Reaction } = require("../models");

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
      return res
        .status(404)
        .json({ message: `User with id ${userId} not found` });
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
      return res.status(404).json({ message: `User not created` });
    }

    return res
      .status(201)
      .json({ message: "User successfully created", id: user._id });
  } catch (error) {
    console.log(`[ERROR]: Failed to create user | ${error.message}`);
  }
};

const updateUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email } = req.body;

    let userData;

    if (!username && !email) {
      return res.status(500).json({
        success: false,
        message: "no data to proceed with update",
      });
    }
    if (!username) {
      userData = { email };
    }
    if (!email) {
      userData = { username };
    }
    if (email && username) {
      userData = { username, email };
    }

    const user = await User.findByIdAndUpdate(userId, {
      $set: userData,
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: `User with id ${userId} not found` });
    }

    return res.json({ message: "User successfully updated" });
  } catch (error) {
    console.log(`[ERROR]: Failed to update user | ${error.message}`);
  }
};
const deleteUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return res
        .status(404)
        .json({ message: `User with id ${userId} not found` });
    }

    const username = targetUser.username;

    const response = await User.deleteOne({ _id: userId });

    if (response.status > 299) {
      return res
        .status(500)
        .json({ message: `User with id ${userId} could not be deleted` });
    }

    const cascadingToThoughts = await Thought.deleteMany({
      username: username,
    });

    if (cascadingToThoughts.status > 299) {
      return res.status(500).json({
        message: `Thoughts from this user could not be deleted`,
      });
    }

    const cascadingToReactions = await Reaction.deleteMany({
      username: username,
    });

    if (cascadingToReactions.status > 299) {
      return res.status(500).json({
        message: `Reactions from this user could not be deleted`,
      });
    }

    return res.json({ message: `User with id ${userId} successfully deleted` });
  } catch (error) {
    console.log(`[ERROR]: Failed to get user by id | ${error.message}`);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
