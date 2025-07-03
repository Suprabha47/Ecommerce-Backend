const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.post("/add-product", productController.addProduct);
router.get("/", productController.getProducts);
router.delete("/:id", productController.deleteProduct);
router.put("/edit-product", productController.updateProduct);
router.get("/:id", productController.productDetails);

module.exports = router;
