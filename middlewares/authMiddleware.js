const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret_token_key = process.env.secret_token_key

function verifyToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1]?.trim();
  
  if (!token) {
    return res.status(403).json({ error: "Token is missing" });
  }

  jwt.verify(token, secret_token_key, (err, decoded) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.status(401).json({ error: 'Token is invalid' });
    }
    req.user = decoded;
    next();
  });
}

module.exports = { verifyToken };
