const express = require('express');
const { 
    createController,
    getAllController,
    getByIdController,
    updateByIdController,
    deleteByIdController,
    deleteAllController 
} = require('../Controllers/feedbackController');

const router = express.Router();

// Create a new feedback
router.post('/', createController);

// Get all feedbacks
router.get('/', getAllController);

// Get a feedback by ID
router.get('/:id', getByIdController);

// Update a feedback by ID
router.put('/:id', updateByIdController);

// Delete a feedback by ID
router.delete('/:id', deleteByIdController);

// Delete all feedbacks
router.delete('/', deleteAllController);

module.exports = router;