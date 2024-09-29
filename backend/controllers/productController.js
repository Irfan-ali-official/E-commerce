import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

// Get all products with filtering

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
});

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) res.json(product);
    else res.status(404).json({ message: "Product not found" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Create new product (Admin)
export const createProduct = async (req, res) => {
  const { name, price, image, category } = req.body;

  try {
    const product = new Product({
      name,
      price,
      image,
      category,
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update product (Admin)
export const updateProduct = async (req, res) => {
  const { name, price, image, category, _id } = req.body;

  const product = {
    name,
    price,
    image,
    category,
  };

  try {
    // Convert the ID to ObjectId before querying
    const objectId = new mongoose.Types.ObjectId(_id);

    // Try to find the product with the converted objectId
    const document = await Product.findById(objectId);
    if (!document) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(objectId, product, {
      new: true,
      runValidators: true,
    });

    // Send response if successful
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete product (Admin)
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(404).json({ success: false, message: "Product not found" });
  }
};
