const mongoose = require("mongoose");
let adminSchema = new mongoose.Schema({
  fullname: {
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
    type: Bufferf,
    required: true,
  },
});

module.exports = mongoose.model("admin", adminSchema);
