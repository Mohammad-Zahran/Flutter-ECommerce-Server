const Product = require("../models/product.model.js");
const asyncHandler = require("express-async-handler");
const { uploadProduct } = require("express-async-handler");
const multer = require("multer");

// create new product
const CreateProduct = asyncHandler(async (req, res) => {
  try {
    // Execute the Multer middleware to handle multiple file fields
    uploadProduct.fields([
      { name: "image1", maxCount: 1 },
      { name: "image2", maxCount: 1 },
      { name: "image3", maxCount: 1 },
      { name: "image4", maxCount: 1 },
      { name: "image5", maxCount: 1 },
    ])(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // Handle Multer errors, if any
        if (err.code === "LIMIT_FILE_SIZE") {
          err.message =
            "File size is too large. Maximum filesize is 5MB per image.";
        }
        console.log(`Add product: ${err}`);
        return res.json({ success: false, message: err.message });
      } else if (err) {
        // Handle other errors, if any
        console.log(`Add product: ${err}`);
        return res.json({ success: false, message: err });
      }

      // Extract product data from the request body
      const {
        name,
        description,
        quantity,
        price,
        offerPrice,
        proCategoryId,
        proSubCategoryId,
        proBrandId,
        proVariantTypeId,
        proVariantId,
      } = req.body;

      // Check if any required fields are missing
      if (!name || !quantity || !price || !proCategoryId || !proSubCategoryId) {
        return res
          .status(400)
          .json({ success: false, message: "Required fields are missing." });
      }

      // Initialize an array to store image URLs
      const imageUrls = [];

      // Iterate over the file fields
      const fields = ["image1", "image2", "image3", "image4", "image5"];
      fields.forEach((field, index) => {
        if (req.files[field] && req.files[field].length > 0) {
          const file = req.files[field][0];
          const imageUrl = `http://localhost:8080/image/products/${file.filename}`;
          imageUrls.push({ image: index + 1, url: imageUrl });
        }
      });

      // Create a new product object with data
      const newProduct = new Product({
        name,
        description,
        quantity,
        price,
        offerPrice,
        proCategoryId,
        proSubCategoryId,
        proBrandId,
        proVariantTypeId,
        proVariantId,
        images: imageUrls,
      });

      // Save the new product to the database
      await newProduct.save();

      // Send a success response back to the client
      res.json({
        success: true,
        message: "Product created successfully.",
        data: null,
      });
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error creating product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = {
  CreateProduct,
};
