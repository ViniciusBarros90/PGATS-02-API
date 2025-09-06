const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'segredo_super_secreto';

function authenticateTokenGraphql(req) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.split(' ')[1];
  if (!token) return { user: null };
  try {
    const user = jwt.verify(token, SECRET);
    return { user };
  } catch {
    return { user: null };
  }
}

function generateToken(user) {
  return jwt.sign({ username: user.username, isFavored: user.isFavored }, SECRET, { expiresIn: '1h' });
}

module.exports = { authenticateTokenGraphql, generateToken };
