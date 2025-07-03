const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_CONNECT)
      .then(() => console.log("connected to db ..."));
  } catch (err) {
    console.log("Error while connecting to DB, ", err);
  }
};
module.exports = connectDB;
