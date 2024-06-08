const dbConfig = require("../config/dbConfig");
const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./userModel")(sequelize, DataTypes);
db.Report = require("./reportModel")(
  sequelize,
  DataTypes
);

db.sequelize.sync({ alter: true }).then(() => {
  console.log("Drop and re-sync db.");
});

module.exports = db;
