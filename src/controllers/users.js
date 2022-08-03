const getAllUsers = (req, res) => {
  return res.json({ message: "getting users" });
};
const getUserById = (req, res) => {
  return res.json({ message: "getting user by ID" });
};
const createUser = (req, res) => {
  return res.json({ message: "creating user" });
};
const updateUserById = (req, res) => {
  return res.json({ message: "updating user" });
};
const deleteUserById = (req, res) => {
  return res.json({ message: "deleting user" });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
