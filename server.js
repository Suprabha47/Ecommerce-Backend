const express = require("express");
const cors = require("cors");
const Category = require("./models/categoryModel");
const Product = require("./models/productModel");
const User = require("./models/userModel");
const connectDB = require("./config/db");
const { configDotenv } = require("dotenv");
const app = express();

configDotenv();

// connect to ur db
connectDB();

// use required middlewares
app.use(express.json());
app.use(cors());

// static files serving
app.use("/productImages", express.static("images"));

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));
app.use("/api/products", require("./routes/productRoutes"));

// global error handler (must be the last error handler)
app.use((error, req, res, next) =>
  res.status(500).json({ message: "Someting went wrong!", error })
);

const port = process.env.PORT || 3001;
//starting server
app.listen(port, () => console.log(`port initialized at ${port}...`));
