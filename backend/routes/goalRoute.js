const express = require("express");
const router = express.Router();
const {
  getAllGoals,
  getOneGoal,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

router.get("/", getAllGoals);

router.get("/:id", getOneGoal);

router.post("/", setGoal);

router.put("/:id", updateGoal);

router.delete("/:id", deleteGoal);

module.exports = router;
