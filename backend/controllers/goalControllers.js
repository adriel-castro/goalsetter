const getGoals = (req, res) => {
  res.json({ message: "GET All Goals" });
};

const getOneGoal = (req, res) => {
  res.json({ message: "GET One Goal" });
};

const setGoal = (req, res) => {
  res.json({ message: "SET Goal" });
};

const updateGoal = (req, res) => {
  res.json({ message: "UPDATE Goal" });
};

const deleteGoal = (req, res) => {
  res.json({ message: "DELETE Goal" });
};

module.exports = { getGoals, getOneGoal, setGoal, updateGoal, deleteGoal };
