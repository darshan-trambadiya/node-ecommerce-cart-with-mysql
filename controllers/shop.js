// Import models
const Product = require("../models/product");

// Fetch and render all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

// Fetch and render a single product by ID
exports.getProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.render("shop/product-detail", {
      product,
      pageTitle: product.title,
      path: "/products",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

// Fetch and render the index page with all products
exports.getIndex = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

// Fetch and render the user's cart
exports.getCart = async (req, res) => {
  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts();
    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      products,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

// Add a product to the user's cart
exports.postCart = async (req, res) => {
  const { productId } = req.body;

  try {
    const cart = await req.user.getCart();
    const [product] = await cart.getProducts({ where: { id: productId } });

    let newQuantity = 1;
    if (product) {
      const oldQuantity = product.cartItem.quantity;
      newQuantity = oldQuantity + 1;
    }

    const productToAdd = product || (await Product.findByPk(productId));
    await cart.addProduct(productToAdd, { through: { quantity: newQuantity } });

    res.redirect("/cart");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

// Delete a product from the user's cart
exports.postCartDeleteProduct = async (req, res) => {
  const { productId } = req.body;

  try {
    const cart = await req.user.getCart();
    const [product] = await cart.getProducts({ where: { id: productId } });

    if (!product) {
      return res.status(404).send("Product not found in cart");
    }

    await product.cartItem.destroy();
    res.redirect("/cart");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

// Create an order from the user's cart
exports.postOrder = async (req, res) => {
  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts();

    const order = await req.user.createOrder();
    await order.addProducts(
      products.map((product) => {
        product.orderItem = { quantity: product.cartItem.quantity };
        return product;
      })
    );

    await cart.setProducts(null); // Clear the cart
    res.redirect("/orders");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

// Fetch and render the user's orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await req.user.getOrders({ include: ["products"] });
    res.render("shop/orders", {
      path: "/orders",
      pageTitle: "Your Orders",
      orders,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
