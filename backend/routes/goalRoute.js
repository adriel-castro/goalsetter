const express = require("express");
const router = express.Router();
const {
  getAllGoals,
  getOneGoal,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/", protect, getAllGoals);

router.get("/:id", protect, getOneGoal);

router.post("/", protect, setGoal);

router.put("/:id", protect, updateGoal);

router.delete("/:id", protect, deleteGoal);

module.exports = router;
