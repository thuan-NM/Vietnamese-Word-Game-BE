const mongoose = require("mongoose");
let qnaSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  subjectId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "subjects",
  },
  answers: [
    {
      type: String,
    },
  ],
  challengeType: {
    type: String,
    enum: ["qnas", "hangman", "arrange"],
    required: true,
  },
  rightAnswer: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
});

module.exports = mongoose.model("qnas", qnaSchema);