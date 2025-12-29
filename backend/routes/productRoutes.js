const express = require("express");
const {
  getProducts,
  addProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();
const auth = require("../middlewares/authMiddleware");

router.get("/", auth, getProducts);
router.post("/", auth, addProduct);
router.delete("/:id", auth, deleteProduct);

module.exports = router;
