const express = require("express");
const questionController = require("../controllers/questionController");

const qnaRouter = express.Router();

qnaRouter.post("/admin", questionController.createNewQuestion);
qnaRouter.get("/", questionController.getAllQuestions);
qnaRouter.get("/admin", questionController.getAllQuestionsAdmin);
// qnaRouter.get("/qna/:id", questionController.getQuestion);
qnaRouter.put('/:id', questionController.updateQuestionById);
qnaRouter.delete("/:id", questionController.deleteQuestionById);

module.exports = qnaRouter;
