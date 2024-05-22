const Reminder = require('../Models/reminderModel');
const asyncHandler = require('express-async-handler');

// Create a new reminder
const createController = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const newReminder = await new Reminder(req.body);
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
    const reminders = await Reminder.find();
    res.status(200).json(reminders);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Get a reminder by ID
const getByIdController = asyncHandler(async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id);
    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }
    res.status(200).json(reminder);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Update a reminder by ID
const updateByIdController = asyncHandler(async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id);
    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }
    const updatedFeedback = await Reminder.findByIdAndUpdate(
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

// Delete a reminder by ID
const deleteByIdController = asyncHandler(async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id);
    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }
    await reminder.remove();
    res.status(200).json({ message: 'Reminder deleted' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Delete all reminders
const deleteAllController = asyncHandler(async (req, res) => {
  try {
    await Reminder.deleteMany({});
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