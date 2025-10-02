const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('MongoDB connected');
    } catch (err) {
        console.log(err.message);
    }
};

module.exports = connectDB;