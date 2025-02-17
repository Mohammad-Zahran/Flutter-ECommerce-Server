const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller.js");

router.post("/", productController.CreateProduct);
router.get("/", productController.getAllProducts);

module.exports = router;
