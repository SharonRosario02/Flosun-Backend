const Reminder = require("../Models/reminderModel");
const asyncHandler = require("express-async-handler");
const {sendReminderEmail} = require("../Utils/sendReminderEmail");
const schedule = require("node-schedule");

// Create a new reminder
// const createController = asyncHandler(async (req, res) => {
//   try {
//     console.log(req.body);
//     const newReminder = await new Reminder(req.body);
//     const createdReminder = await newReminder.save();
//     res.status(201).json(createdReminder);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ message: error.message });
//   }
// });

// const createController = asyncHandler(async (req, res) => {
//   try {
//     console.log(req.body);
//     const newReminder = await new Reminder(req.body);
//     const createdReminder = await newReminder.save();

//     // Schedule the reminder email
//     const reminderDate = new Date(createdReminder.date);
//     schedule.scheduleJob(reminderDate, async () => {
//       await sendReminderEmail(createdReminder.email, createdReminder.eventName);
//     });

//     res.status(201).json(createdReminder);
//   } catch (error) {
//     console.log("Error sending reminder email:", error.message);
//     console.log("Error stack trace:", error.stack);
//     res.status(500).json({ message: error.message });
//   }
// });


// Create a new reminder
const createController = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const { email, eventName, date } = req.body;
    const newReminder = await new Reminder({ email, eventName, date });
    const createdReminder = await newReminder.save();

    // Calculate the time difference between current time and date
    const currentTime = new Date();
    const reminderTime = new Date(date);
    const timeDifference = reminderTime.getTime() - currentTime.getTime();

    // Schedule the reminder email
    setTimeout(async () => {
      await sendReminderEmail(email, eventName);
    }, timeDifference);

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
      return res.status(404).json({ message: "Reminder not found" });
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
      return res.status(404).json({ message: "Reminder not found" });
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
      return res.status(404).json({ message: "Reminder not found" });
    }
    await reminder.remove();
    res.status(200).json({ message: "Reminder deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Delete all reminders
const deleteAllController = asyncHandler(async (req, res) => {
  try {
    await Reminder.deleteMany({});
    res.status(200).json({ message: "All reminders deleted" });
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
