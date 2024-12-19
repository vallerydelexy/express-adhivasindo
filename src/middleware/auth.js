// /src/middleware/auth.js
const { verifyToken } = require('../utils/jwt');

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const authorizeInstructor = (req, res, next) => {
  if (req.user.role !== 'INSTRUCTOR') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

module.exports = { authenticate, authorizeInstructor };