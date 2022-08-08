const { User } = require("../models");

const createFriendForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { friendId } = req.body;

    const firstStep = await User.findOneAndUpdate(
      { _id: userId },
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
      { _id: friendId },
      {
        $push: {
          friends: userId,
        },
      }
    );

    return res.status(201).json({
      message: "Friendship successfully created",
      friendId: friendId,
      userId: userId,
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to create friendship | ${error.message}`);
  }
};

const deleteFriendForUser = async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return res.status(404).json({ message: `User not found` });
    }

    const targetFriend = await User.findById(friendId);
    if (!targetFriend) {
      return res.status(404).json({ message: `Friend not found` });
    }

    const firstStep = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { friends: friendId } }
    );
    if (firstStep.status > 299) {
      return res.status(500).json({
        message: `Friendship could not be deleted`,
      });
    }

    const secondStep = await User.findOneAndUpdate(
      { _id: friendId },
      { $pull: { friends: userId } }
    );
    if (secondStep.status > 299) {
      return res.status(500).json({
        message: `Friendship could not be deleted`,
      });
    }

    return res.json({
      message: `Friendship successfully deleted`,
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to delete friendship`);
  }
};

module.exports = {
  createFriendForUser,
  deleteFriendForUser,
};
