const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const multer = require("multer");
const path = require("path");

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use("/productImages", express.static("images"));

app.listen(port, () => console.log(`port initialized at ${port}...`));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "images"),
  filename: (req, file, cb) => {
    const imageFileName = Date.now() + "-" + file.originalname;
    cb(null, imageFileName);
  },
});

// connecting with db
mongoose
  .connect(process.env.MONGODB_CONNECT)
  .then(() => console.log("connected to database..."))
  .catch((err) => console.log(err));

const { Schema, model } = mongoose;

const CustomerDataSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});
const Customer = model("users", CustomerDataSchema);

app.post("/sign-up", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const customerExists = await Customer.findOne({ email });
    if (customerExists)
      return res
        .status(409)
        .send("Your Email is already registered! \nLogin Instead.");
    const customer = Customer.create({ firstName, lastName, email, password });
    res.status(201).send(`Customer created: ${customer}`);
    console.log("done creating...");
  } catch (err) {
    res.status(500).send("Currently we are facing server issues...");
    console.log(err);
  }
});

app.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;
  try {
    const isCustomer = await Customer.findOne({ email, password });
    if (!isCustomer) res.status(401).send("Incorrect email or password!");
    res.status(200).json(isCustomer.firstName);
    console.log("signed-in...");
  } catch (err) {
    res.status("500").send("Currently we are facing server issues...");
    console.log(err);
  }
});

const ProductDataSchema = new Schema({
  productName: { type: String, required: true },
  productDescription: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  discountPrice: { type: Number, required: true },
  seoTitle: { type: String, required: true },
  seoDescription: { type: String, required: true },
});

const Product = model("products", ProductDataSchema);

// to add a product
app.post("/add-product", async (req, res) => {
  const {
    productName,
    productDescription,
    price,
    image,
    discountPrice,
    seoTitle,
    seoDescription,
  } = req.body;

  try {
    const existingProduct = await Product.findOne({
      productName,
      productDescription,
      price,
    });
    if (existingProduct) return res.status(409).send("Product already exists!");
    const product = Product.create({
      productName,
      productDescription,
      price,
      image,
      discountPrice,
      seoTitle,
      seoDescription,
    });
    return res.status(201).send(`Product ${productName} created!`);
  } catch (err) {
    console.log("Error occured: ", err);
    res.status(500).send("Server Error!");
  }
});

// to get the product list
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    if (!products)
      return res.status(404).json({ message: "No products found!" });
    res.status(200).json(products);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// to delete a product
app.delete("/products", async (req, res) => {
  const id = req.body.id;

  try {
    const delProduct = await Product.deleteOne({ _id: id });
    if (delProduct.deletedCount === 0)
      return res.status(404).send("Product not found!");
    return res
      .status(200)
      .json({ message: "Product deleted!", result: delProduct });
  } catch (err) {
    res.status(500).send(err);
  }
});

// to inert multiple product data in db (through postman only)
app.post("/productsMulti", async (req, res) => {
  const products = req.body;
  try {
    const added = await Product.insertMany(products);
    res.status(201).json({ message: "products added!", response: products });
  } catch (err) {
    res.send(err);
  }
});

// to update product data
app.put("/edit-product", async (req, res) => {
  const { _id, p } = req.body;

  try {
    const updated = await Product.findOneAndUpdate({ _id }, p);
    console.log("updated?: ", updated);
    console.log("inside /edit-product!");
    if (!updated) return res.status(404).send("product not found");
    return res.status(200).json({ mgs: "product updated!", res: req.body });
  } catch (err) {
    console.log("inside error /edit-product!");
    return res.status(500).send(err);
  }
});

// to fetch a product detail
app.post("/product-details", async (req, res) => {
  const { id } = req.body;
  try {
    const product = await Product.findOne({ _id: id });
    if (product)
      return res.status(200).json({ message: "Product found!", data: product });
    return res.status(404).send("Product not found!");
  } catch (err) {
    res.status(500).send(err);
  }
});

const imageHandle = multer({ storage });

app.post("/productImages", imageHandle.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded!" });
  res.status(200).json({
    message: "File uploaded!",
    imageUrl: `http://localhost:3001/productImages/${req.file.filename}`,
  });
});

app.get("/productImages/:fileName", (req, res) => {
  const file = req.params.fileName;
});
app.use((error, req, res, next) =>
  res.status(500).send("Something went wrong!")
);
