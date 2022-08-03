const getAllThoughts = (req, res) => {
  return res.json({ message: "getting Thoughts" });
};
const getThoughtById = (req, res) => {
  return res.json({ message: "getting Thought by ID" });
};
const createThought = (req, res) => {
  return res.json({ message: "creating Thought" });
};
const updateThoughtById = (req, res) => {
  return res.json({ message: "updating Thought" });
};
const deleteThoughtById = (req, res) => {
  return res.json({ message: "deleting Thought" });
};

module.exports = {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThoughtById,
  deleteThoughtById,
};
