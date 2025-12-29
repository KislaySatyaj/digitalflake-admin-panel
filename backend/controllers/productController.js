const Product = require("../models/Product");

// GET all products
exports.getProducts = async (req, res) => {
  const products = await Product.find()
    .populate("categoryId", "name")
    .populate("subcategoryId", "name");

  res.json(products);
};

// ADD product
exports.addProduct = async (req, res) => {
  const { name, categoryId, subcategoryId, image } = req.body;

  const product = new Product({
    name,
    categoryId,
    subcategoryId,
    image,
  });

  await product.save();
  res.json({ message: "Product added successfully" });
};

// DELETE product
exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted successfully" });
};
