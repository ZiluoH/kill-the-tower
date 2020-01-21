const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EnemySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
      type: String,
      required: true
  },
  hp: {
    type: Number,
    required: true
  },
  attck: {
    type: Number,
    required: true
  },
  defense: {
      type: Number,
      required: true
  },
  img: {
    type: String,
    required: false
  }

});

module.exports = Enemy = mongoose.model("Enemy", EnemySchema);
