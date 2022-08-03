module.exports = (sequelize, DataTypes) => {
  const Goal = sequelize.define("goal", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    // insert user Model reference

    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Goal;
};
