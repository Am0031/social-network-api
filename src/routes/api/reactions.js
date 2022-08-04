const { Router } = require("express");
const {
  createReactionForThought,
  deleteReactionForThought,
} = require("../../controllers/reactions");

const router = Router({ mergeParams: true });

router.post("/reactions", createReactionForThought);
router.delete("/reactions/:reactionId", deleteReactionForThought);

module.exports = router;
