const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Successfully connected to MongoDB');
})