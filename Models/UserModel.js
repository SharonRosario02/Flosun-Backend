const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: false,
  },
  blocked: {
    type: Boolean,
    required: false,
  },
  resetPasswordOTP: {
    type: String,
    required: false,
  },
  resetPasswordOTPExpires: {
    type: Date,
    required: false,
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;