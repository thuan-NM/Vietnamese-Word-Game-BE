const mongoose = require("mongoose");
let adminSchema = new mongoose.Schema({
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
  avatar: {
    type: Buffer,
  },
});

module.exports = mongoose.model("admins", adminSchema);
