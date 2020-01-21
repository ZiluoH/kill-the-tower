const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

router.get("/map", (req, res) => {
  Map.findById( req.params.id )
    .then(maps => res.json(maps))
    .catch(err =>
      res.status(404).json({ nomapsfound: "No such map" })
    );
});


module.exports = router;