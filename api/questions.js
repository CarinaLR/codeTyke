const express = require("express");
const router = express.Router();
const models = require("../models");
// const Question = require("../models/question")
//new structure
const Question = models.Question;

// middleware that is specific to this router
//async functions handle promises.
router.get("/", async (req, res, next) => {
  try {
    const questions = Question.findAll({
      //include: [models.Option]
      include: ["options"]
    });
    res.status(200).res.json(questions);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
