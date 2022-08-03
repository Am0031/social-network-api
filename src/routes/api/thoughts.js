const { Router } = require("express");

const reactions = require("./reactions");

const router = Router();

router.get("/", getAllThoughts);
router.get("/:id", getThoughtById);
router.post("/", createThought);
router.put("/:id", updateThoughtById);
router.delete("/:id", deleteThoughtById);
router.use("/:thoughtId", reactions);

module.exports = router;
