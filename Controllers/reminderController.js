const Reminder = require("../Models/reminderModel");
const asyncHandler = require("express-async-handler");
const {sendReminderEmail} = require("../Utils/sendReminderEmail");
const schedule = require("node-schedule");
const nodemailer = require('nodemailer');

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
// const createController = asyncHandler(async (req, res) => {
//   try {
//     console.log(req.body);
//     const { email, eventName, date } = req.body;
//     const newReminder = await new Reminder({ email, eventName, date });
//     const createdReminder = await newReminder.save();

//     // Calculate the time difference between current time and date
//     const currentTime = new Date();
//     const reminderTime = new Date(date);
//     const timeDifference = reminderTime.getTime() - currentTime.getTime();

//     // Schedule the reminder email
//     setTimeout(async () => {
//       await sendReminderEmail(email, eventName);
//     }, timeDifference);

//     res.status(201).json(createdReminder);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ message: error.message });
//   }
// });


const createController = asyncHandler(async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const { email, eventName, date } = req.body;
    const newReminder = await new Reminder({ email, eventName, date });
    const createdReminder = await newReminder.save();
    console.log('Reminder created:', createdReminder);

    // Schedule the reminder email
    const reminderDate = new Date(date);
    console.log('Reminder scheduled for:', reminderDate);
    schedule.scheduleJob(reminderDate, async () => {
      try {
        console.log('Sending reminder email...');
        // Create a transporter using nodemailer with retry mechanism
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'naikpradnya64@gmail.com',
            pass: 'lycw hnhg rynm abht',
          },
          tls: {
            rejectUnauthorized: false,
          },
          // Add retry options
          pool: true,
          maxConnections: 1,
          rateDelta: 10000,
          rateLimit: 5,
        }, {
          from: 'naikpradnya64@gmail.com',
          headers: {
            'X-Laziness-level': 1000,
          },
        });
        console.log('Transporter created');

        // Compose the reminder email
        const mailOptions = {
          to: email,
          subject: 'Reminder - Flosun',
          html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta http-equiv="X-UA-Compatible" content="ie=edge" />
              <title>Reminder - Flosun</title>
              <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />
            </head>
            <body style="margin: 0; font-family: 'Poppins', sans-serif; background: #ffffff; font-size: 14px;">
              <div style="max-width: 680px; margin: 0 auto; padding: 45px 30px 60px; background: #f4f7ff; background-image: url(https://wallpapercave.com/wp/wp7923280.jpg); background-repeat: no-repeat; background-size: cover; background-position: top center; font-size: 14px; color: #434343;">
                <header>
                  <table style="width: 100%;">
                    <tbody>
                      <tr style="height: 0;">
                        <td>
                          <p style="margin: 0; font-size: 24px; line-height: 30px; color: #FF3EA5; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; background-color: rgba(255, 255, 255, 0.8); padding: 5px 10px; border-radius: 5px;">Flosun 💐</p>
                        </td>
                        <td style="text-align: right;">
                          <span style="font-size: 16px; line-height: 30px; color: #333333; font-weight: 600; background-color: rgba(255, 255, 255, 0.8); padding: 5px 10px; border-radius: 5px;">${new Date().toLocaleDateString()}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </header>
                <main>
                  <div style="margin: 0; margin-top: 70px; padding: 92px 30px 115px; background: #ffffff; border-radius: 30px; text-align: center;">
                    <div style="width: 100%; max-width: 489px; margin: 0 auto;">
                      <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #1f1f1f;">Reminder: ${eventName}</h1>
                      <p style="margin: 0; margin-top: 17px; font-size: 14px; font-weight: 400;">This is a friendly reminder for the event: ${eventName}.</p>
                      <p style="margin: 0; margin-top: 17px; font-size: 14px; font-weight: 600;">Best Regards,<br>Flosun</p>
                    </div>
                  </div>
                </main>
                <footer style="width: 100%; max-width: 490px; margin: 20px auto 0; text-align: center; border-top: 1px solid #e6ebf1;">
                  <p style="margin: 0; margin-top: 40px; font-size: 14px; color: #434343;">Copyright © ${new Date().getFullYear()} Flosun. All rights reserved.</p>
                </footer>
              </div>
            </body>
            </html>
          `,
          text: `This is a friendly reminder for the event: ${eventName}. Best Regards, Flosun`,
        };
        console.log('Mail options created:', mailOptions);

        // Send the reminder email with retry mechanism
        const retryTransporter = nodemailer.createTransport(transporter.options, {
          // Add retry options
          retryDelay: 5000,
          maxRetries: 3,
        });
        await retryTransporter.sendMail(mailOptions);
        console.log('Reminder email sent successfully');
      } catch (error) {
        console.log('Error sending reminder email:', error.message);
        console.log('Error details:', error);
      }
    });

    res.status(201).json(createdReminder);
  } catch (error) {
    console.log('Error creating reminder:', error.message);
    console.log('Error details:', error);
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
