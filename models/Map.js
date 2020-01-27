const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MapSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  monster: {
    type: Number,
    required: true
  },
  elite: {
    type: Number,
    required: true
  },
  camp: {
    type: Number,
    required: true
  },
  chest: {
    type: Number,
    required: true
  }
});

module.exports = GameMap = mongoose.model("GameMap", MapSchema);
