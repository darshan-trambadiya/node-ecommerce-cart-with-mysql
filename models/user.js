// Import required modules
const Sequelize = require("sequelize");
const { sequelize } = require("../utils/database");

// Define the User model
const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true, // Ensure email is unique
  },
});

// Export the User model
module.exports = User;
