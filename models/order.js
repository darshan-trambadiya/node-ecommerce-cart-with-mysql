// Import required modules
const Sequelize = require("sequelize");
const { sequelize } = require("../utils/database");

// Define the Order model
const Order = sequelize.define("order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

// Export the Order model
module.exports = Order;
