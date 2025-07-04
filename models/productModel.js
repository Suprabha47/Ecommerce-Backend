const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const ProductDataSchema = new Schema({
  productName: { type: String, required: true },
  productDescription: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  category: { type: String, required: true },
  discountPrice: { type: Number, required: true },
  seoTitle: { type: String, required: true },
  seoDescription: { type: String, required: true },
});

module.exports = model("Product", ProductDataSchema);
