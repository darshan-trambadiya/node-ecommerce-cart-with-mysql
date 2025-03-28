// Import required modules
const Sequelize = require("sequelize");
const { sequelize } = require("../utils/database");

// Define the CartItem model
const CartItem = sequelize.define("cartItem", {
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

// Export the CartItem model
module.exports = CartItem;
