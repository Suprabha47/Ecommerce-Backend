const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserDataSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
    trim: true,
  },
  password: { type: String, required: true },
});

module.exports = model("User", UserDataSchema);
