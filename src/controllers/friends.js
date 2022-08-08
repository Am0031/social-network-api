const { User } = require("../models");

const createFriendForUser = async (req, res) => {
  try {
    const { userId } =  req.params;
    const { friendId } = req.body;

    const firstStep = await User.findOneAndUpdate(
      {_id: userId},
      {
        $push: {
          friends: friendId,
        },
      }
    );

    if (!firstStep) {
      return res.status(404).json({ message: `Friendship not created` });
    }

    const secondStep = await User.findOneAndUpdate(
      {_id: friendId},
      {
        $push: {
          friends: userId,
        },
      }
    );

    return res.status(201).json({
      message: "Friendship successfully created"
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to create friendship | ${error.message}`);
  }
};

const deleteFriendForUser = async (req, res) => {
  return res.json({ message: "deleting friend for user" });
};

module.exports = {
  createFriendForUser,
  deleteFriendForUser,
};
