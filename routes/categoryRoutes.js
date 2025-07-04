const express = require("express");
const categoryController = require("../controllers/categoryController");
const router = express.Router();

router.get("/", categoryController.getCategory);
router.post("/add-category", categoryController.addCategory);
router.delete("/:id", categoryController.deleteCategory);
router.put("/update-category/:id", categoryController.updateCategory);

module.exports = router;
