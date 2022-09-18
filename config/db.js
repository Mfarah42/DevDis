const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

// Async function
const connectDB = async () => {
  // wrap asyns in try catch blocks
  try {
    await mongoose.connect(db);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.log(err.message);

    // Exit process
    process.exit(1);
  }
};

module.exports = connectDB;
