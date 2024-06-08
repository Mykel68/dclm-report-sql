const dbConfig = require("./config/dbConfig");

const Sequelize = require("sequelize").Sequelize;
const DataTypes = require("sequelize").DataTypes;

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

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});

const express = require("express");
const cors = require("cors");
const reportRoute = require("./routes/reportRoute");


const app = express();
const PORT = process.env.PORT || 5000;
app.use("/api/report", reportRoute);

require("dotenv").config();

// CORS middleware
app.use(cors());
app.use(express.json());



sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
