const mongoose = require('mongoose');

exports.connect = () => {
    // Connect to MongoDB
    const url_db = process.env.DB_URL
    mongoose.connect(url_db, { useNewUrlParser: true, useUnifiedTopology: true });

    // Check the connection
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
    console.log('Connected to MongoDB');
    });
}