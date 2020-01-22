

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Card = require("../../models/Card");

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

// router.get("/starter", (req, res) => {
//   Card.find({type: "starter"})
//     .then(cards => res.json(cards))
//     .catch(err => res.status(404).json({ nocardsfound: "No cards ???!!!??!!!" }));
// });

router.get("/starter", (req, res) => {
  Card.find({type: "starter"})
    .then(cards => res.json(cards))
    
});

router.get("/", (req, res) => {
  Card.find({type: req.type})
    .then(cards => res.json(cards))
    
});

module.exports = router;