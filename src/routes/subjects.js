const express = require("express");

const subjectController = require("../controllers/subjectController");

const subjectRouter = express.Router();

subjectRouter.get("/",subjectController.getAll)

subjectRouter.post("/", subjectController.createSubject);

subjectRouter.delete("/:id", subjectController.deleteSubject)

subjectRouter.put("/:id", subjectController.updateSubject)


module.exports = subjectRouter;