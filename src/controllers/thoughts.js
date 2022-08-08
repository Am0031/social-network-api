const { Thought } = require("../models");

const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find({});

    return res.json({ data: thoughts });
  } catch (error) {
    console.log(`[ERROR]: Failed to get all users | ${error.message}`);
  }
};
const getThoughtById = async (req, res) => {
  return res.json({ message: "getting Thought by ID" });
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
