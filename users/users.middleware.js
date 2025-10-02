const jwt = require('../utils/jwt');

// Middleware to verify JWT token
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
            code: 401,
            message: 'Authorization header missing or malformed' 
        });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ 
            code: 401,
            message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.decode(token);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ 
            code: 401,
            message: 'Invalid or expired token' });
    }

};

module.exports = authenticate;