const ProductOrderModel = require('../Models/productOrdersModel.js');
const asyncHandler = require('express-async-handler');

// Create a new order
const createController = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const newOrder = await new ProductOrderModel(req.body);
    const createdOrder = await newOrder.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Get all orders
const getAllController = asyncHandler(async (req, res) => {
  try {
    const orders = await ProductOrderModel.find()
      .populate('customerId', '-password -createdAt -updatedAt')
      .populate({
        path: 'products.productId',
        select: 'price name img description',
      });
    res.status(200).json(orders);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Get an order by ID
const getByIdController = asyncHandler(async (req, res) => {
  try {
    const order = await ProductOrderModel.findById(req.params.id).populate('customerId').populate('products.productId');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Update an order by ID
const updateByIdController = asyncHandler(async (req, res) => {
  try {
    const order = await ProductOrderModel.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    const updatedOrder = await ProductOrderModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Delete an order by ID
const deleteByIdController = asyncHandler(async (req, res) => {
  try {
    const order = await ProductOrderModel.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Delete all orders
const deleteAllController = asyncHandler(async (req, res) => {
  try {
    await ProductOrderModel.deleteMany({});
    res.status(200).json({ message: 'All orders deleted' });
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