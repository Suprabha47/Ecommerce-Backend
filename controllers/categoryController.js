const Category = require("../models/categoryModel");

exports.getCategory = async (req, res) => {
  const categories = await Category.find();
  try {
    if (categories.length === 0)
      return res.status(200).json({ message: "No categories found", data: [] });
    return res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
};

exports.addCategory = async (req, res) => {
  const { categoryName } = req.body;
  if (!categoryName || categoryName.trim() === "")
    return res.status(400).json({ message: "Category name is required." });
  try {
    const exist = await Category.findOne({ categoryName });
    if (exist)
      return res
        .status(409)
        .json({ message: "Category already exists!", data: exist });
    const newCategory = await Category.create(req.body);
    return res
      .status(201)
      .json({ message: "Category created.", data: newCategory });
  } catch (err) {
    res.status(500).json({ message: "Some error occured.", error: err });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const delCategory = await Category.findByIdAndDelete(id);
    if (!delCategory)
      return res.status(404).send("Category not found. Could not delete.");
    return res
      .status(200)
      .json({ message: "Category deleted", data: delCategory });
  } catch (err) {
    res.status(500).json({ message: "some error occured!", error: err });
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  if (!id || !updateData)
    return res
      .status(400)
      .json({ message: "Missing product ID or update data." });

  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedCategory)
      return res.status(404).json({ message: "Category not found!" });
    return res
      .status(200)
      .json({ message: "Category Updated.", data: updatedCategory });
  } catch (err) {
    res.status(500).json({
      message: "Server error occurred.",
      error: err.message,
    });
  }
};
