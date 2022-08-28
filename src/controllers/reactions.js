const { Reaction, Thought } = require("../models");

const createReactionForThought = async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;

    const newReactionData = { username, reactionBody };

    const reaction = await Reaction.create(newReactionData);

    if (!reaction) {
      return res.status(500).json({ message: `Reaction not created` });
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
    return res.status(500).json({
      message: `[ERROR]: Failed to create reaction | ${error.message}`,
    });
  }
};

const deleteReactionForThought = async (req, res) => {
  try {
    const { thoughtId, reactionId } = req.params;

    const targetReaction = await Reaction.findById(reactionId);
    if (!targetReaction) {
      return res.status(404).json({ message: `Reaction not found` });
    }

    const response = await Reaction.deleteOne({ _id: reactionId });

    if (response.status > 299) {
      return res.status(500).json({ message: `Reaction could not be deleted` });
    }

    const cascadingResponse = await Thought.findOneAndUpdate(
      { _id: thoughtId },
      { $pull: { reactions: reactionId } }
    );

    if (cascadingResponse.status > 299) {
      return res.status(500).json({
        message: `Reaction could not be deleted from thought's reactions array`,
      });
    }

    return res.json({
      message: `Reaction successfully deleted`,
    });
  } catch (error) {
    return res.status(500).json({
      message: `[ERROR]: Failed to delete reaction | ${error.message}`,
    });
  }
};

module.exports = {
  createReactionForThought,
  deleteReactionForThought,
};
