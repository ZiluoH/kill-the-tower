const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: false
  },
  action: {
    type: String,
    required: true
  },
  type: {
      type: String,
      required: true
  }
});

module.exports = Card = mongoose.model("Card", CardSchema);
