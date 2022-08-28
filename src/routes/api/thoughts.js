const { Router } = require("express");
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThoughtById,
  deleteThoughtById,
} = require("../../controllers/thoughts");

const reactions = require("./reactions");

const router = Router();

router.get("/", getAllThoughts);
router.get("/:thoughtId", getThoughtById);
router.post("/", createThought);
router.put("/:thoughtId", updateThoughtById);
router.delete("/:thoughtId", deleteThoughtById);
router.use("/:thoughtId", reactions);

module.exports = router;
