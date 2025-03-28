// Import models
const Product = require("../models/product");

// Render the add product page
exports.getAddProduct = (req, res) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

// Handle the addition of a new product
exports.postAddProduct = async (req, res) => {
  const { title, imageUrl, price, description } = req.body;

  try {
    await req.user.createProduct({
      title,
      price,
      imageUrl,
      description,
    });

    res.redirect("/admin/products");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

// Render the edit product page
exports.getEditProduct = async (req, res) => {
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect("/");
  }

  const prodId = req.params.productId;

  try {
    const products = await req.user.getProducts({ where: { id: prodId } });
    const product = products[0];

    if (!product) {
      return res.redirect("/");
    }

    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

// Handle the update of an existing product
exports.postEditProduct = async (req, res) => {
  const { productId, title, price, imageUrl, description } = req.body;

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    product.title = title;
    product.price = price;
    product.imageUrl = imageUrl;
    product.description = description;

    await product.save();

    res.redirect("/admin/products");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

// Render the list of products for the admin
exports.getProducts = async (req, res) => {
  try {
    const products = await req.user.getProducts();

    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

// Handle the deletion of a product
exports.postDeleteProduct = async (req, res) => {
  const { productId } = req.body;

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    await product.destroy();

    res.redirect("/admin/products");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
