const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// Function to generate a JWT token
const encode = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

// Middleware to verify JWT token
const decode = (token) => {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = { 
    encode,
    decode 
};