const User = require('../Models/UserModel')
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

//signup controller
const signUpController = asyncHandler(async (req, res) => {
  try {
    const { username, email, phone, password, confirmPassword } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create a new user
    const newUser = new User({
      username,
      email,
      phone,
      password,
      confirmPassword
    });

    // Save the user to the database
    const savedUser = await newUser.save();
    // Generate JWT token
    const token = jwt.sign({ userId: savedUser._id, email: email }, 'your-secret-key', { expiresIn: '1h' });
    res.status(201).json({ token, user: savedUser });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Server error during user signup' });
  }
});

// User sign-in with JWT token
const signInController = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the stored password
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

    res.status(200).json({ token, user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Server error during user sign-in' });
  }
});

// Get all users
const getAllUsersController = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Server error while getting users' });
  }
});

const getUserByIdController = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      ret    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Server error while getting user' });
  }
});

// Update a user by ID
const updateUserController = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Server error while updating user' });
  }
});

// Delete all users
const deleteAllUsersController = asyncHandler(async (req, res) => {
  try {
    await User.deleteMany({});
    res.status(200).json({ message: 'All users deleted' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Server error while deleting users' });
  }
});

// Delete a single user by ID
const deleteSingleUserController = asyncHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Server error while deleting user', error: error });
  }
});

// Generate reset password OTP
const generateResetPasswordOTP = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP and expiration time to the user document
    user.resetPasswordOTP = otp;
    user.resetPasswordOTPExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Send OTP to the user's email using nodemailer
    const transporter = nodemailer.createTransport({
      // Your email transport configuration
      service: 'gmail',
      auth: {
        user: 'naikpradnya64@gmail.com',
        pass: 'garq gtyt qlcb fpzk',
      },
    });

    const mailOptions = {
      from: 'naikpradnya64@gmail.com',
      to: user.email,
      subject: 'Reset Password OTP - Flosun',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <title>Reset Password OTP - Flosun</title>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />
        </head>
        <body style="margin: 0; font-family: 'Poppins', sans-serif; background: #ffffff; font-size: 14px;">
        <div style="max-width: 680px; margin: 0 auto; padding: 45px 30px 60px; background: #f4f7ff; background-image: url(https://wallpapercave.com/wp/wp7923280.jpg); background-repeat: no-repeat; background-size: cover; background-position: top center; font-size: 14px; color: #434343;">

            <header>
              <table style="width: 100%;">
                <tbody>
                  <tr style="height: 0;">
                    <td>
                      <p style="margin: 0; font-size: 24px; line-height: 30px; color: #FF3EA5; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;  background-color: rgba(255, 255, 255, 0.8); padding: 5px 10px; border-radius: 5px;">Flosun 💐 </p>
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
                  <h1 style="margin: 0; font-size: 18px; font-weight: 500; color: #1f1f1f;">Reset Password OTP</h1>
                  <h1 style="margin: 0; margin-top: 17px; font-size: 32px; font-weight: 600; color: #1f1f1f;">OTP: ${otp}</h1>
                  <p style="margin: 0; margin-top: 17px; font-size: 14px; font-weight: 400;">You are receiving this email because you (or someone else) has requested to reset the password for your Flosun account.</p>
                  <p style="margin: 0; margin-top: 17px; font-size: 14px; font-weight: 400;">This OTP will expire in <span style="font-weight: 600; color: #1f1f1f;">10 minutes</span>.</p>
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
      text: `You are receiving this email because you (or someone else) has requested to reset the password for your Flosun account. Your one-time password (OTP) is: ${otp}. This OTP will expire in 10 minutes. If you did not request this, please ignore this email and your password will remain unchanged.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Server error while generating OTP' });
  }
});

// Verify reset password OTP
const verifyResetPasswordOTP = asyncHandler(async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.resetPasswordOTP !== otp || user.resetPasswordOTPExpires < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Server error while verifying OTP' });
  }
});

// Reset user password
const resetPasswordController = asyncHandler(async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.resetPasswordOTP !== otp || user.resetPasswordOTPExpires < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Update user password
    user.password = newPassword;
    user.resetPasswordOTP = undefined;
    user.resetPasswordOTPExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Server error while resetting password' });
  }
});

module.exports = {
  signUpController,
  signInController,
  getAllUsersController,
  updateUserController,
  deleteAllUsersController,
  deleteSingleUserController,
  generateResetPasswordOTP,
  verifyResetPasswordOTP,
  resetPasswordController,
  getUserByIdController,
};