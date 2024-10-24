require('dotenv').config()
const mongoose = require('mongoose');


const url = process.env.MONGOURI




const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1); // Exit process with failure
  }
};

//connectDB(); // Call the connection function

module.exports = connectDB;
