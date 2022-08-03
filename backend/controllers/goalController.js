const asyncHandler = require("express-async-handler");

const db = require("../models");

const Goal = db.goals;

const getAllGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.findAll();
  res.json(goals);
});

const getOneGoal = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const goal = await Goal.findOne({ where: { id: id } });

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found!");
  }

  res.json(goal);
});

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

const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findByPk(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found!");
  }

  // Make sure User 1 will not be able to UPDATE User 2 goals
  // const user = await User.findByPk(req.user.id);

  // Check for user
  // if (!user) {
  //   res.status(401);
  //   throw new Error("User not Found!");
  // }

  // Make sure the logged in user matches the goal user
  // if (goal.user !== user.id) {
  //   res.status(401);
  //   throw new Error("User not Authorized!");
  // }

  await Goal.update(req.body, {
    where: { id: req.params.id },
  });

  res.status(200).json("Goal is Updated Successfully!");
});

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findByPk(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found!");
  }

  // Make sure User 1 will not be able to DELETE User 2 goals
  // const user = await User.findByPk(req.user.id);

  // Check for user
  // if (!user) {
  //   res.status(401);
  //   throw new Error("User not Found!");
  // }

  // Make sure the logged in user matches the goal user
  // if (goal.user !== user.id) {
  //   res.status(401);
  //   throw new Error("User not Authorized!");
  // }

  await Goal.destroy({ where: { id: req.params.id } });
  res.status(200).json({ message: "Goal is Deleted Successfully!" });
});

module.exports = { getAllGoals, getOneGoal, setGoal, updateGoal, deleteGoal };
