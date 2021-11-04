const { Schema, model } = require("mongoose");

const DeanModel = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: { type: String, required: true },
  accountType: { type: String, required: true },
});

module.exports = model("Dean", DeanModel);
