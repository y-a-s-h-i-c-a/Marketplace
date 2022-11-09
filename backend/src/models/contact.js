const mongoose = require("mongoose");

const User1 = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
  },
  { collection: "user-data1" },
);

const model1 = mongoose.model("UserData1", User1);

module.exports = model1;
