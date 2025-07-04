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
    res.status(500).json({ message: "Post method error", error: err });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0)
      return res.status(404).json({ message: "No products added!" });
    return res.status(200).json(products);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const delProduct = await Product.findByIdAndDelete(id);
    if (!delProduct) return res.status(404).send("Product not found!");
    return res
      .status(200)
      .json({ message: "Product Deleted!", result: delProduct });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error!", error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { _id, p } = req.body;
  if (!_id || !p)
    return res
      .status(400)
      .json({ message: "Missing product ID or update data." });

  try {
    const updated = await Product.findOneAndUpdate({ _id }, p, { new: true });
    if (!updated) return res.status(404).send("Product not found!");
    return res
      .status(200)
      .json({ message: "Product Updated!", result: updated });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error.", error: err.message });
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
