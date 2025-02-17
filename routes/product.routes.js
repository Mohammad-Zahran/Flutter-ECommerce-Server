const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller.js");

router.post("/", productController.CreateProduct);

module.exports = router;
