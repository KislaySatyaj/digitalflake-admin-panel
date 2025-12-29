const Category = require("../models/Category");

// GET all categories
exports.getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

// ADD category
exports.addCategory = async (req, res) => {
  const { name, image } = req.body;

  const category = new Category({
    name,
    image,
  });

  await category.save();
  res.json({ message: "Category added successfully" });
};

// DELETE category
exports.deleteCategory = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Category deleted successfully" });
};
