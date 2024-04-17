// authMiddleware.js

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).json({ status:403,message: 'Token not provided' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ status:403, message: 'Failed to authenticate token' });
        }
        req.user = user;
        next();
    });
}

module.exports = { authenticateToken };
