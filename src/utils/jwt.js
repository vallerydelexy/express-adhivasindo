// /src/utils/jwt.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    SECRET_KEY,
    { expiresIn: '24h' }
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = { generateToken, verifyToken };