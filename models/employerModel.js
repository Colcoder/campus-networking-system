const { Schema, model } = require("mongoose");

const EmployerModel = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  accountType: { type: String, required: true },
});

module.exports = model("employer", EmployerModel);
