'use strict';
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI; // Use the env variable from Render

if (!mongoURI) {
  console.error("MONGO_URI environment variable is not set.");
  process.exit(1);
}

mongoose.set('strictQuery', false); // Optional, handles Mongoose deprecation warning

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

console.log("MongoDB Connection URI: ", mongoURI);

mongoose.connect(mongoURI, mongoOptions)
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => {
    console.error(" MongoDB connection error:", err);
    process.exit(1);
  });

module.exports = mongoose;
