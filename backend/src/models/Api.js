const mongoose = require("mongoose");

const apiSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
  },
  endPoint: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    min: 3,
  },
});

const API = mongoose.model("API", apiSchema);

module.exports = API;
