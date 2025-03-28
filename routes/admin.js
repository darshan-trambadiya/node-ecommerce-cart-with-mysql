// Import required modules
const express = require("express");

// Import controllers
const adminController = require("../controllers/admin");

const router = express.Router();

// Route to display the form for adding a new product
router.get("/add-product", adminController.getAddProduct);

// Route to fetch and display all products
router.get("/products", adminController.getProducts);

// Route to handle the submission of the form for adding a new product
router.post("/add-product", adminController.postAddProduct);

// Route to display the form for editing an existing product
router.get("/edit-product/:productId", adminController.getEditProduct);

// Route to handle the submission of the form for editing an existing product
router.post("/edit-product", adminController.postEditProduct);

// Route to handle the deletion of a product
router.post("/delete-product", adminController.postDeleteProduct);

// Export the router to be used in the main application
module.exports = router;
