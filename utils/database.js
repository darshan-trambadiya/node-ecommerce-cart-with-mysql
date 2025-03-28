// Import required modules
require("dotenv").config();
const { Sequelize } = require("sequelize");

const getSequelizeInstance = (dbName = "") => {
  return new Sequelize(dbName, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false, // Disable logging for cleaner output (optional)
  });
};

// Create a Sequelize instance without specifying the database name initially
const sequelizeNoDb = getSequelizeInstance();

// Create a Sequelize instance with the database name included
const sequelize = getSequelizeInstance(process.env.DB_NAME);

// Function to initialize the database
const initializeDatabase = async () => {
  try {
    // Check if the database exists, and create it if it doesn't
    await sequelizeNoDb.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`
    );
    console.log(
      `=========> ✅ Database "${process.env.DB_NAME}" checked/created successfully.`
    );

    // Close the initial connection
    await sequelizeNoDb.close();

    // Test the connection
    await sequelize.authenticate();
    console.log(
      "=========> ✅ Connection to the database has been established successfully."
    );

    return sequelize;
  } catch (error) {
    console.error("=========> ❌ Unable to initialize the database:", error);
    process.exit(1); // Exit the process with an error code
  }
};

// Export the initializeDatabase function and sequelize instance
module.exports = { initializeDatabase, sequelize };
