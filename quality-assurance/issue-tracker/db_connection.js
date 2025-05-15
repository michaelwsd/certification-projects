const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

// This is the connection object
const db = mongoose.connection;

db.on('connected', () => {
  console.log('✅ Mongoose connected to MongoDB');
});

db.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

db.on('disconnected', () => {
  console.log('⚠️ Mongoose disconnected from MongoDB');
});

module.exports = db;
