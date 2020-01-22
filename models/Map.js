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
  enemy_positions: {
    type: Array,
    default: []
  },
  camp_positions: {
    type: Array,
    default: []
  },
  random_positions: {
    type: Array,
    default: []
  }
});

module.exports = GameMap = mongoose.model("GameMap", MapSchema);
