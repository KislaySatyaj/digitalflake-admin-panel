const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// ✅ ROUTE IMPORTS
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const subcategoryRoutes = require("./routes/subcategoryRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

/* ✅ CORS (FRONTEND ACCESS) */
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

/* ✅ BODY PARSER */
app.use(express.json());

/* ✅ AUTH ROUTES (VERY IMPORTANT) */
app.use("/api/auth", authRoutes);

/* ✅ PROTECTED ROUTES */
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/products", productRoutes);

/* ✅ DB CONNECTION */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error.message);
  });

/* ✅ HEALTH CHECK */
app.get("/", (req, res) => {
  res.send("Backend with local MongoDB is running");
});
