const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const CategorySchema = new Schema({
  categoryName: { type: String, required: true, unique: true },
  categoryDescription: { type: String, required: true },
});

module.exports = model("Category", CategorySchema);
