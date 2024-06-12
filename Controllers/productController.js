const Product = require('../Models/productModel.js');
const asyncHandler = require('express-async-handler');

// Create a new product
const createController = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const newReminder = await new Product(req.body);
    const createdReminder = await newReminder.save();
    res.status(201).json(createdReminder);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Get all reminders
const getAllController = asyncHandler(async (req, res) => {
  try {
    const reminders = await Product.find();
    res.status(200).json(reminders);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Get a product by ID
const getByIdController = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Update a product by ID
const updateByIdController = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const updatedFeedback = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json(updatedFeedback);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Delete a product by ID
const deleteByIdController = asyncHandler(async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  });

// Delete all reminders
const deleteAllController = asyncHandler(async (req, res) => {
  try {
    await Product.deleteMany({});
    res.status(200).json({ message: 'All reminders deleted' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  createController,
  getAllController,
  getByIdController,
  updateByIdController,
  deleteByIdController,
  deleteAllController,
};