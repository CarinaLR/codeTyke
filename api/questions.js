const express = require("express");
const router = express.Router();
const models = require("../models");
// const Question = require("../models/question")
//new structure
const Question = models.Question;

//three ways of passing in info
// - req.body - request
// - req.params - path variable
// - req.query - query string

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

router.post('/', async (req, res, next) => {
  try {
    const { body, instructions, options } = req.body;
    if (body && instructions) {
      if (options) {
        // if the user is also making 4 options - to validate whether all of the options are unique or not, and before saving a new question to the db
        const optionsSet = new Set(options);
        if (optionsSet.size !== 4) {
          res.sendStatus(400);
          return;
        }
      }

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const question = await Question.findByPk(id);
    if (question) {
      res.status(200).json(question);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const questionToUpdate = await Question.findByPk(id);
    if (questionToUpdate) {
      const { body, instructions } = req.body;
      const updatedQuestion = await questionToUpdate.update({
        body,
        instructions
      });
      res.status(200).json(updatedQuestion);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    // another method:
    // Question.destroy({
    //   where: { id }
    // });
    // res.status(200).json({ status: "Deleted successfully" });
    const questionToDelete = await Question.findByPk(id);
    if (questionToDelete) {
      const deletedQuestion = await questionToDelete.destroy();
      res.status(200).json(deletedQuestion);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
