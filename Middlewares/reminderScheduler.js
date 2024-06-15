const cron = require('node-cron');
const nodemailer = require('nodemailer');
const Reminder = require('./Models/reminderModel');

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'sharon2002222@gmail.com',
    pass: 'garq gtyt qlcb fpzk',
  },
});

// Define the cron job to run every minute
cron.schedule('* * * * *', async () => {
  try {
    // Get upcoming reminders
    const currentDate = new Date();
    const upcomingReminders = await Reminder.find({
      reminderDate: { $gte: currentDate, $lte: new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000) }, // Reminders in the next 7 days
    });

    // Send reminder emails
    for (const reminder of upcomingReminders) {
      const mailOptions = {
        from: 'sharon2002222@gmail.com',
        to: reminder.email,
        subject: `Reminder: ${reminder.eventName}`,
        text: `This is a reminder for ${reminder.eventName} on ${reminder.reminderDate.toLocaleString()}.`,
      };

      await transporter.sendMail(mailOptions);
    }
  } catch (error) {
    console.error('Error sending reminder emails:', error);
  }
});