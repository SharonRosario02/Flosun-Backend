const nodemailer = require('nodemailer');

async function sendReminderEmail(email, eventName) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sharon@ealphabits.com',
        pass: 'garq gtyt qlcb fpzk',
      },
    });

    const mailOptions = {
      from: 'sharon@ealphabits.com',
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
          <!-- Email content goes here -->
          <div style="max-width: 680px; margin: 0 auto; padding: 45px 30px 60px; background: #f4f7ff; background-image: url(https://wallpapercave.com/wp/wp7923280.jpg); background-repeat: no-repeat; background-size: cover; background-position: top center; font-size: 14px; color: #434343;">
            <!-- Email header -->
            <header>
              <!-- Email header content goes here -->
            </header>
            <!-- Email main content -->
            <main>
              <div style="margin: 0; margin-top: 70px; padding: 92px 30px 115px; background: #ffffff; border-radius: 30px; text-align: center;">
                  
              <div style="width: 100%; max-width: 489px; margin: 0 auto;">
                  <h1 style="margin: 0; font-size: 18px; font-weight: 500; color: #1f1f1f;">Reminder</h1>
                  <h1 style="margin: 0; margin-top: 17px; font-size: 32px; font-weight: 600; color: #1f1f1f;">${eventName}</h1>
                  <p style="margin: 0; margin-top: 17px; font-size: 14px; font-weight: 400;">This is a friendly reminder for the event: ${eventName}.</p>
                  <p style="margin: 0; margin-top: 17px; font-size: 14px; font-weight: 600;">Best Regards,<br><span style="color: #ff69b4;">Flosun</span></p>
                </div>
              </div>
            </main>
            <!-- Email footer -->
           <footer style="width: 100%; max-width: 490px; margin: 20px auto 0; text-align: center; border-top: 1px solid #e6ebf1;">
  <p style="margin: 0; margin-top: 40px; font-size: 14px; color: #434343; background-color: #ffb6c1; padding: 10px;">Copyright © ${new Date().getFullYear()} Flosun. All rights reserved.</p>
</footer>
          </div>
        </body>
        </html>
      `,
      text: `This is a friendly reminder for the event: ${eventName}.`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Reminder email sent successfully');
  } catch (error) {
    console.log('Error sending reminder email:', error);
  }
}

module.exports = {
    sendReminderEmail,
};