const express = require("express");
const {
  getCategories,
  addCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();
const auth = require("../middlewares/authMiddleware");


router.get("/", auth, getCategories);
router.post("/", auth, addCategory);
router.delete("/:id", auth, deleteCategory);

module.exports = router;
