const express = require("express");
const {
  getSubcategories,
  addSubcategory,
  deleteSubcategory,
} = require("../controllers/subcategoryController");

const router = express.Router();
const auth = require("../middlewares/authMiddleware");

router.get("/", auth,  getSubcategories);
router.post("/", auth, addSubcategory);
router.delete("/:id", auth, deleteSubcategory);

module.exports = router;
