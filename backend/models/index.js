const { Sequelize, DataTypes } = require("sequelize");
const { connectDB } = require("../config/db");

const sequelize = new Sequelize(
  connectDB.database,
  connectDB.user,
  connectDB.password,
  {
    host: connectDB.host,
    dialect: connectDB.dialect,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log(
      `MySQL Database Connected: ${connectDB.database}`.cyan.underline
    );
  })
  .catch((err) => {
    console.log("Database Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.goals = require("./goalModel")(sequelize, DataTypes);
db.users = require("./userModel")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("MySQL Database Re-sync Done!".magenta.underline);
});

module.exports = db;
