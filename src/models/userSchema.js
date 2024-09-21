let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    length: 10 || 11,
  },
  gender: {
    type: String,
    required: true,
  },
  avatar: {
    type: Buffer,
  },
  dob: {
    type: Date,
    required: true,
  },
  totalpoint: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("users", userSchema);
