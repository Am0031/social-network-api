const { Thought, User } = require("../models");

const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find({});

    return res.json({ data: thoughts });
  } catch (error) {
    console.log(`[ERROR]: Failed to get all thoughts | ${error.message}`);
  }
};
const getThoughtById = async (req, res) => {
  try {
    const { thoughtId } = req.params;

    const thought = await Thought.findById(thoughtId);

    if (!thought) {
      return res
        .status(404)
        .json({ message: `Thought with id ${thoughtId} not found` });
    }

    return res.json({ data: thought });
  } catch (error) {
    console.log(`[ERROR]: Failed to get thought by id | ${error.message}`);
  }
};
const createThought = async (req, res) => {
  try {
    const { username, thoughtText } = req.body;

    const createdAt = new Date();

    const newThoughtData = { username, thoughtText, createdAt };

    const thought = await Thought.create(newThoughtData);

    if (!thought) {
      return res.status(404).json({ message: `Thought not created` });
    }

    const thoughtId = thought._id;
    const userToUpdate = await User.findOneAndUpdate(
      { username: username },
      {
        $push: {
          thoughts: thoughtId,
        },
      }
    );

    return res.status(201).json({
      message: "Thought successfully created",
      id: thought._id,
      username: username,
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to create thought | ${error.message}`);
  }
};
const updateThoughtById = async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const { thoughtText } = req.body;

    if (!thoughtText) {
      return res.status(500).json({
        success: false,
        message: "no data to proceed with update",
      });
    }

    const thoughtData = { thoughtText };

    const thought = await Thought.findByIdAndUpdate(thoughtId, {
      $set: thoughtData,
    });

    if (!thought) {
      return res
        .status(404)
        .json({ message: `Thought with id ${thoughtId} not found` });
    }

    return res.json({ message: "Thought successfully updated" });
  } catch (error) {
    console.log(`[ERROR]: Failed to update thought | ${error.message}`);
  }
};
const deleteThoughtById = async (req, res) => {
  try {
    const { thoughtId } = req.params;

    const targetThought = await Thought.findById(thoughtId);
    if (!targetThought) {
      return res
        .status(404)
        .json({ message: `Thought with id ${thoughtId} not found` });
    }

    const targetUser = targetThought.username;

    const response = await Thought.deleteOne({ _id: thoughtId });

    if (response.status > 299) {
      return res
        .status(500)
        .json({ message: `Thought with id ${thoughtId} could not be deleted` });
    }

    const cascadingResponse = await User.findOneAndUpdate(
      { username: targetUser },
      { $pull: { thoughts: thoughtId } }
    );

    if (cascadingResponse.status > 299) {
      return res.status(500).json({
        message: `Thought with id ${thoughtId} could not be deleted from User's thoughts array`,
      });
    }

    return res.json({
      message: `Thought with id ${thoughtId} successfully deleted`,
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to get thought by id | ${error.message}`);
  }
};

module.exports = {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThoughtById,
  deleteThoughtById,
};
