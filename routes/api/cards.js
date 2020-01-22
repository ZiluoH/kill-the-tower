const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Card = require("../../models/Card");

router.get("/:type", (req, res) => {
  Card.find({ type: req.params.type })
    .then(cards => res.json(cards))
    .catch(err => 
      res.status(404).json({ nocardsfound: "No cards ???!!!??!!!" })
      );
  });

module.exports = router;