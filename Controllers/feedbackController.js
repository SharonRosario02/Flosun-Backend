const Feedback = require('../Models/feedbackModel');
const asyncHandler = require('express-async-handler');

// Create a new feedback
const createController = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const newFeedback = await new Feedback(req.body);
    const createdFeedback = await newFeedback.save();
    res.status(200).json(createdFeedback);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Get all feedbacks
const getAllController = asyncHandler(async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Get a feedback by ID
const getByIdController = asyncHandler(async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json(feedback);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Update a feedback by ID
const updateByIdController = asyncHandler(async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    const updatedFeedback = await Feedback.findByIdAndUpdate(
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

// Delete a feedback by ID
const deleteByIdController = asyncHandler(async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json({ message: 'Feedback deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Delete all feedbacks
const deleteAllController = asyncHandler(async (req, res) => {
  try {
    await Feedback.deleteMany({});
    res.status(200).json({ message: 'All feedbacks deleted' });
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