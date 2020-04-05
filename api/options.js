const express = require("express");
const router = express.Router();
const models = require("../models");
// const Option = require("../models/option")
//new structure
const Option = models.Option;

//three ways of passing in info
// - req.body - request
// - req.params - path variable
// - req.query - query string

// middleware that is specific to this router
//async functions handle promises.
router.get("/", async (req, res, next) => {
  try {
    const options = Option.findAll({
      //include: [models.Option]
      include: ["questions"],
    });
    res.status(200).res.json(options);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { body, imageUrl, questions } = req.body;
    if (body && imageUrl) {
      const newOption = await Option.create({
        body,
        imageUrl,
      });

      res.status(200).json(newOption);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const option = await Option.findByPk(id);
    if (option) {
      res.status(200).json(option);
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
    const optionToUpdate = await Option.findByPk(id);
    if (optionToUpdate) {
      const { body, imageUrl } = req.body;
      const updatedOption = await optionToUpdate.update({
        body,
        imageUrl,
      });
      res.status(200).json(updatedOption);
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
    const optionToDelete = await Option.findByPk(id);
    if (optionToDelete) {
      const deletedOption = await optionToDelete.destroy();
      res.status(200).json(deletedOption);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
