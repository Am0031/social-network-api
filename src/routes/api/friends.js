const { Router } = require("express");
const {
  createFriendForUser,
  deleteFriendForUser,
} = require("../../controllers/friends");

const router = Router();

router.post("/friends", createFriendForUser);
router.delete("/friends/:friendId", deleteFriendForUser);

module.exports = router;
