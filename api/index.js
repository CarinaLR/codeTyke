const express = require("express");
const router = express.Router();

// middleware that is specific to this router
router.use("/questions", require("./questions"));
router.use("/questionOptions", require("./questionOptions"));

module.exports = router;
