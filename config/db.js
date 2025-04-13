'use strict';
const mongoose = require('mongoose');
const config = require('../config/config'); // make sure path is correct

const mongoURI = config.MONGO_URI;

console.log("-------mongoURI-------", mongoURI);
if (!mongoURI.startsWith('mongodb://') && !mongoURI.startsWith('mongodb+srv://')) {
  console.error("Invalid MongoDB URI. Make sure it starts with 'mongodb://' or 'mongodb+srv://'");
  process.exit(1);
}

mongoose.set('strictQuery', false);

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

console.log("MongoDB Connection URI: ", mongoURI);

mongoose.connect(mongoURI, mongoOptions)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

module.exports = mongoose;
