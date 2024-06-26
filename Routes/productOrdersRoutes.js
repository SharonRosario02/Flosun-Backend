const express = require('express');
const { 
    createController,
    getAllController,
    getByIdController,
    updateByIdController,
    deleteByIdController,
    deleteAllController,
    getAllByCustomerIdController
} = require('../Controllers/productOrdersController.js');

const router = express.Router();

// Create a new feedback
router.post('/', createController);

// Get all feedbacks
router.get('/', getAllController);

// Get all feedbacks
router.get('/customer/:id', getAllByCustomerIdController);

// Get a feedback by ID
router.get('/:id', getByIdController);

// Update a feedback by ID
router.put('/:id', updateByIdController);

// Delete a feedback by ID
router.delete('/:id', deleteByIdController);

// Delete all feedbacks
router.delete('/', deleteAllController);

module.exports = router;