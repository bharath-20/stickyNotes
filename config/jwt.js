const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret_token_key = process.env.secret_token_key

async function generateToken(userId, role) {
    const payload = { userId, role };
    const token = jwt.sign(payload, secret_token_key, { expiresIn: '1h' }); // Change 'your-secret-key' to a strong, secret key
    return token;
}

module.exports = {
    generateToken
};
