const asyncHandler = require("express-async-handler");

const db = require("../models");

const Goal = db.goals;
const User = db.users;

// Problem as of 8/3/22 1047pm req.user.id is undefined. we cannot decode the req.user in auth Middleware
// Get all goals
const getAllGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.findAll({ where: { user: req.user.id } });

  res.status(200).json(goals);
});

// Get One Goal
const getOneGoal = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const goal = await Goal.findOne({ where: { id: id, user: req.user.id } });

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found!");
  }

  res.status(200).json(goal);
});

// Post Goal
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const data = {
    text: req.body.text,
    user: req.user.id,
  };

  const goal = await Goal.create(data);

  res.status(200).json(goal);
});

// Update Goal
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findByPk(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found!");
  }

  // Make sure User 1 will not be able to UPDATE User 2 goals
  const user = await User.findByPk(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not Found!");
  }

  // Make sure the logged in user matches the goal user
  if (goal.user !== user.id) {
    res.status(401);
    throw new Error("User not Authorized!");
  }

  await Goal.update(req.body, {
    where: { id: req.params.id },
  });

  res.status(200).json("Goal is Updated Successfully!");
});

// Delete Goal
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findByPk(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found!");
  }

  // Make sure User 1 will not be able to DELETE User 2 goals
  const user = await User.findByPk(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not Found!");
  }

  // Make sure the logged in user matches the goal user
  if (goal.user !== user.id) {
    res.status(401);
    throw new Error("User not Authorized!");
  }

  await Goal.destroy({ where: { id: req.params.id } });
  res.status(200).json({ message: "Goal is Deleted Successfully!" });
});

module.exports = { getAllGoals, getOneGoal, setGoal, updateGoal, deleteGoal };
