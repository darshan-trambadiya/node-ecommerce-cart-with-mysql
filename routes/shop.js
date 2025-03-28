// Import required modules
const express = require("express");

// Import controllers
const shopController = require("../controllers/shop");

const router = express.Router();

// Route to display the homepage (index) of the shop
router.get("/", shopController.getIndex);

// Route to fetch and display all available products
router.get("/products", shopController.getProducts);

// Route to fetch and display details of a specific product by its ID
router.get("/products/:productId", shopController.getProduct);

// Route to display the user's shopping cart
router.get("/cart", shopController.getCart);

// Route to handle adding a product to the shopping cart
router.post("/cart", shopController.postCart);

// Route to handle deleting a product from the shopping cart
router.post("/cart-delete-item", shopController.postCartDeleteProduct);

// Route to handle creating an order from the items in the shopping cart
router.post("/create-order", shopController.postOrder);

// Route to fetch and display all orders placed by the user
router.get("/orders", shopController.getOrders);

// Export the router to be used in the main application
module.exports = router;
