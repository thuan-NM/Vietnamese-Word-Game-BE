const Qna = require("../models/qnaSchema");

exports.getAllQuestions = async function (req, res) {
  const { subjectId, challengeType } = req.query;

  let questionCount = 0;
  if (challengeType == "hangman") questionCount = 1;
  else if (challengeType == "qnas") questionCount = 10;
  else if (challengeType == "arrange") questionCount = 5;

  const questions = await Qna.find({ subjectId, challengeType });

  // pick random questions from question list
  const tmpQuestions = questions.sort(() => 0.5 - Math.random()); // shuffle questions
  const result = tmpQuestions.slice(0, questionCount);

  return res.status(200).json({
    questions: result,
  });
};

exports.getAllQuestionsAdmin = async function (req, res) {
  const questions = await Qna.find({});
  return res.status(200).json({
    questions: questions,
  });
};

// exports.getQuestion = function (req, res, next) {
//   Qna.findById(req.params.id)
//     .populate(challengeType)
//     .exec(function (err, question) {
//       if (err) {
//         return res.json({ err });
//       }
//       res.json({
//         question: question.question,
//         answers: question.answers,
//         rightAnswer: question.rightAnswer,
//       });
//     });
// };

exports.createNewQuestion = async function (req, res) {
  const { question, answers, rightAnswer, subjectId, challengeType } = req.body;
  try {
    let newQuestionData = {
      question,
      challengeType,
      rightAnswer,
      subjectId,
    };
    if (challengeType === "hangman") {
      delete newQuestionData.answers;
    } else if (challengeType === "arrange") {
      delete newQuestionData.answers;
      newQuestionData.rightAnswer = rightAnswer.split(",");
    } else {
      newQuestionData.answers = answers;
    }

    const newQuestion = new Qna(newQuestionData);
    delete newQuestion.answers;
    await newQuestion.save();
    res.status(200).json({ message: "Create new question completed!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateQuestionById = async function (req, res) {
  const { id } = req.params;
  const { question, answers, rightAnswer, subjectId, challengeType } = req.body;
  try {
    await Qna.findByIdAndUpdate(id, {
      question,
      answers,
      rightAnswer,
      subjectId,
      challengeType,
    });
    res.status(200).json({ message: "Question updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteQuestionById = async function (req, res) {
  const { id } = req.params;
  try {
    await Qna.findByIdAndDelete(id);
    res.status(200).json({ message: "Question deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
