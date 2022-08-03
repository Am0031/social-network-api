const { Router } = require("express");
const {
  createReactionForThought,
  deleteReactionForThought,
} = require("../../controllers/reactions");

const router = Router();

router.post("/reactions", createReactionForThought);
router.delete("/reactions/:reactionId", deleteReactionForThought);

module.exports = router;
