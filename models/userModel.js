const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserDataSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
    trim: true,
  },
  password: { type: String },
  googleId: { type: String },
  photoUrl: { type: String },
});

module.exports = model("User", UserDataSchema);
