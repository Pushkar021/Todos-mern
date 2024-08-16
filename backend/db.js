const mongoose = require("mongoose");
require("dotenv").config();

let url = process.env.dburl;
mongoose.connect(url);

const schema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const todo = mongoose.model("Todo", schema);

module.exports = {
  todo,
};
