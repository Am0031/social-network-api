const { Reaction, Thought } = require("../models");

const createReactionForThought = async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;

    const createdAt = new Date();

    const newReactionData = { username, reactionBody, createdAt };

    const reaction = await Reaction.create(newReactionData);

    if (!reaction) {
      return res.status(404).json({ message: `Reaction not created` });
    }

    const reactionId = reaction._id;

    const reactionIdToUpdate = await Reaction.findByIdAndUpdate(reactionId, {
      $set: {
        reactionId: reactionId,
      },
    });

    const thoughtToUpdate = await Thought.findOneAndUpdate(
      { _id: thoughtId },
      {
        $push: {
          reactions: reactionId,
        },
      }
    );

    return res.status(201).json({
      message: "Reaction successfully created",
      thoughtId: thoughtId,
      reactionId: reactionId,
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to create reaction | ${error.message}`);
  }
};

const deleteReactionForThought = async (req, res) => {
  return res.json({ message: "deleting Reaction for Thought" });
};

module.exports = {
  createReactionForThought,
  deleteReactionForThought,
};
