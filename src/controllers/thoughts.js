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

    return res
      .status(201)
      .json({
        message: "Thought successfully created",
        id: thought._id,
        username: username,
      });
  } catch (error) {
    console.log(`[ERROR]: Failed to create thought | ${error.message}`);
  }
};
const updateThoughtById = async (req, res) => {
  return res.json({ message: "updating Thought" });
};
const deleteThoughtById = async (req, res) => {
  return res.json({ message: "deleting Thought" });
};

module.exports = {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThoughtById,
  deleteThoughtById,
};
