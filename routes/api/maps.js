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
    .then(map => res.json(map))
    .catch(err =>
      res.status(404).json({ nomapfound: "No such map" })
    );
});

router.post('/', (req, res) => {
  const newMap = new GameMap({
    name: req.body.name,
    user: req.body.user,
    monster: req.body.monster,
    elite: req.body.elite,
    camp: req.body.camp,
    chest: req.body.chest,
  });
  newMap.save().then(map => res.json(map));
});


router.patch('/:id', (req, res) => {
  GameMap.findOneAndUpdate({_id: req.params.id}, req.body)
    .then(map => res.json(map))
    .catch((err) => {
      res.status(404).json({ nomapfound: "No such map" })
    });
});

router.delete('/:id', (req, res) => {
  GameMap.findOneAndDelete({_id: req.params.id})
    .then(map => res.json(map))
    .catch((err) => {
      res.status(404).json({ nomapfound: "No such map" })
    });
})

module.exports = router;