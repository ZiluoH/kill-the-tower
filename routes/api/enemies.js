const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

router.get("/enenmies", (req, res) => {
  Enemy.find({ type: req.params.type })
    .then(enemies => res.json(enemies))
    .catch(err =>
      res.status(404).json({ noenemiesfound: "No enemy ???!!!??!!!" })
    );
});

module.exports = router;
