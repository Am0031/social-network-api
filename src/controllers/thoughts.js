const { Thought } = require("../models");

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
  return res.json({ message: "creating Thought" });
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
