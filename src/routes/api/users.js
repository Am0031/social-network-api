const { Router } = require("express");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} = require("../../controllers/users");
const friends = require("./friends");

const router = Router();

router.get("/", getAllUsers);
router.get("/:userId", getUserById);
router.post("/", createUser);
router.put("/:userId", updateUserById);
router.delete("/:userId", deleteUserById);
router.use("/:userId", friends);

module.exports = router;
