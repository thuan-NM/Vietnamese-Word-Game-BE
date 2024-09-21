const express = require("express");
const subjectController = require("../controllers/subjectController");

const subjectRouter = express.Router();

subjectRouter.get("/subjects", subjectController.getAllSubjects);

module.exports = subjectRouter;
