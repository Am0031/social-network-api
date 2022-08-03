const createFriendForUser = (req, res) => {
  return res.json({ message: "creating friend for user" });
};

const deleteFriendForUser = (req, res) => {
  return res.json({ message: "deleting friend for user" });
};

module.exports = {
  createFriendForUser,
  deleteFriendForUser,
};
