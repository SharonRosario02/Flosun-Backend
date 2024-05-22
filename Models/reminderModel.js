const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    eventName: {
        type: String,
        required: true
    },
})

const Reminder = mongoose.model('reminder', reminderSchema)

module.exports = Reminder