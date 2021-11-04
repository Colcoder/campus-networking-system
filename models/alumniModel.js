const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const AlumniModel = new Schema({
  registrationNumber: {
    type: String,
    unique: true,
  },
  course: {
    type: String,
  },
  grade: {
    type: String,
  },
  username: { type: String, required: true },
  password: { type: String, required: true },
  availability: {
    type: String,
  },
  firstName: { type: String },
  lastName: { type: String },
  accountType: { type: String, required: true },
});

module.exports = model("alumnus", AlumniModel);
