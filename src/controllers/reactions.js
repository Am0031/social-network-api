const createReactionForThought = async (req, res) => {
  return res.json({ message: "creating Reaction for Thought" });
};

const deleteReactionForThought = async (req, res) => {
  return res.json({ message: "deleting Reaction for Thought" });
};

module.exports = {
  createReactionForThought,
  deleteReactionForThought,
};
