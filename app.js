// Import required modules
require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

// Import controllers
const errorController = require("./controllers/error");

// Import models
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

// Import database utilities
const { sequelize, initializeDatabase } = require("./utils/database");

// Import routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// Initialize Express app
const app = express();

// Set up view engine and views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware for parsing request bodies and serving static files
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Middleware to attach the authenticated user to the request object
app.use(async (req, res, next) => {
  try {
    const user = await User.findByPk(1);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    console.error("=========> ❌ Error fetching user:", err);
    next(err);
  }
});

// Route handlers
app.use("/admin", adminRoutes);
app.use(shopRoutes);

// 404 error handler
app.use(errorController.get404);

// Sync database and start the server
const initializeApp = async () => {
  try {
    // Initialize the database
    await initializeDatabase();

    // Define model relationships
    Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
    User.hasMany(Product);
    User.hasOne(Cart);
    Cart.belongsTo(User);
    Cart.belongsToMany(Product, { through: CartItem });
    Product.belongsToMany(Cart, { through: CartItem });
    Order.belongsTo(User);
    User.hasMany(Order);
    Order.belongsToMany(Product, { through: OrderItem });

    // Sync all models with the database
    await sequelize.sync({ force: true }); // Use { force: true } only in development to reset the database

    // Find or create the default user
    let user = await User.findByPk(1);
    if (!user) {
      user = await User.create({
        name: "Darshan Trambadiya",
        email: "trambadiyadarshan5@gmail.com",
      });
    }

    // Create a cart for the user if it doesn't exist
    let cart = await user.getCart();
    if (!cart) {
      cart = await user.createCart();
    }

    // Start the server
    app.listen(process.env.PORT || 3000, () => {
      console.log(
        `=========> ✅ Server is running on http://localhost:${
          process.env.PORT || 3000
        }`
      );
    });
  } catch (err) {
    console.error("=========> ❌ Error initializing the app:", err);
  }
};

// Initialize the application
initializeApp();
