const express = require("express");
const questionController = require("../controllers/questionController");

const qnaRouter = express.Router();

// qnaRouter.post("/qna/new", questionController.createNewQuestion);
qnaRouter.get("/qnas", questionController.getAllQuestions);
// qnaRouter.get("/qna/:id", questionController.getQuestion);
// qnaRouter.put("/qna/:id", questionController.editQuestion);
// qnaRouter.delete("/qna/:id", questionController.deleteQuestion);

module.exports = qnaRouter;
