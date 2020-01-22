const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const GameMap = require("../../models/Map");


router.get("/test", (req, res) => 
    res.json({ msg: "This is the maps route" })
    );

router.get("/", (req, res) => {
  GameMap.find()
    .then(maps => res.json(maps))
    .catch(err =>
      res.status(404).json({ nomapsfound: "No maps found" })
    );
});

router.get("/:id", (req, res) => {
  GameMap.findById( req.params.id )
    .then(maps => res.json(maps))
    .catch(err =>
      res.status(404).json({ nomapfound: "No such map" })
    );
});

module.exports = router;