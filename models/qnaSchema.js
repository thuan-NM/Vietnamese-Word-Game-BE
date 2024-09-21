const mongoose = require("mongoose");
let qnaSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answers: {
    type: String,
    required: true,
  },
  rightanswer: {
    type: String,
    reuired: true,
  },
});

module.exports = mongoose.model("qnas", qnaSchema);
