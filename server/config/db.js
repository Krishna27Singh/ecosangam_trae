const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
  try {
    const rawUri = process.env.MONGO_URI;
    if (!rawUri) {
      throw new Error('MONGO_URI is missing in environment variables');
    }

    // If URI has no db name (ends with /), default to ecosangam.
    const mongoUri = rawUri.endsWith('/') ? `${rawUri}ecosangam` : rawUri;
    const connection = await mongoose.connect(mongoUri);
    console.log(`MongoDB connected (${connection.connection.name})`);
  } catch (err) {
    console.error('DB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
