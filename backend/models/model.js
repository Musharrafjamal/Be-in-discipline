const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  item: String,
  title: String,
  date: String,
  time: String,
});

const ListModel = mongoose.model("items", schema);

module.exports = ListModel;
