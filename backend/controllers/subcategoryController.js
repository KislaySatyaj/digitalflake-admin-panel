const Subcategory = require("../models/Subcategory");

// GET all subcategories
exports.getSubcategories = async (req, res) => {
  const subcategories = await Subcategory.find().populate("categoryId", "name");
  res.json(subcategories);
};

// ADD subcategory
exports.addSubcategory = async (req, res) => {
  const { name, categoryId, image } = req.body;

  const subcategory = new Subcategory({
    name,
    categoryId,
    image,
  });

  await subcategory.save();
  res.json({ message: "Subcategory added successfully" });
};

// DELETE subcategory
exports.deleteSubcategory = async (req, res) => {
  await Subcategory.findByIdAndDelete(req.params.id);
  res.json({ message: "Subcategory deleted successfully" });
};
