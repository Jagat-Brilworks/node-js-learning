const mongoose = require('mongoose');

const uri =
  'mongodb+srv://jagatv:Partner@cluster0.rnl6l.mongodb.net/Test?retryWrites=true&w=majority&appName=Cluster0';

// Function to connect to the MongoDB database using Mongoose
async function connectDB() {
  try {
    // Connect to the MongoDB server using Mongoose
    await mongoose.connect(uri);
    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

module.exports = connectDB;
