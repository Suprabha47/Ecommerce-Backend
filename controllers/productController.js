const Product = require("../models/productModel");

exports.addProduct = async (req, res) => {
  const { productName, productDescription, price } = req.body;

  try {
    const existingProduct = await Product.findOne({
      productName,
      productDescription,
      price,
    });
    if (existingProduct) return res.status(409).send("Product already exists!");
    const product = Product.create(req.body);
    return res.status(201).send(`Product ${productName} created!`);
  } catch (err) {
    console.log("Error occured while adding products!");
    res.status(500).send(err);
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products)
      return res.status(404).json({ message: "No products added!" });
    return res.status(200).json(products);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteProduct = async (req, res) => {
  const _id = req.params.id;
  try {
    const delProduct = await Product.deleteOne({ _id });
    if (delProduct.deletedCount === 0)
      return res.status(404).send("Product not found!");
    return res
      .status(200)
      .json({ message: "Product Deleted!", result: delProduct });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateProduct = async (req, res) => {
  const { _id, p } = req.body;
  try {
    const updated = await Product.findOneAndUpdate({ _id }, p);
    if (!updated) return res.status(404).send("Product not found!");
    return res
      .status(200)
      .json({ message: "Product Updated!", result: req.body });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.productDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (product)
      return res.status(200).json({ message: "Product found.", data: product });
    return res.status(404).send("Product not found.");
  } catch (err) {
    res.status(500).send(err);
  }
};
