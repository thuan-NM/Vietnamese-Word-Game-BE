const mongoose = require("mongoose");
let challengetypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("challenge", challengetypeSchema);
