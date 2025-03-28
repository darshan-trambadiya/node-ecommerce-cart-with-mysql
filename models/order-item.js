// Import required modules
const Sequelize = require("sequelize");
const { sequelize } = require("../utils/database");

// Define the OrderItem model
const OrderItem = sequelize.define("orderItem", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1, // Default quantity is 1
  },
});

// Export the OrderItem model
module.exports = OrderItem;
