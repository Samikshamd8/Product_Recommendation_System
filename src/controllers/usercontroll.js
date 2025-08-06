const UserModel = require('../models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret'; // use dotenv in real apps

exports.register = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ status: 'error', msg: 'All fields required' });

  UserModel.registerUser(username, password)
    .then((msg) => res.json({ status: 'success', msg }))
    .catch((err) => res.status(500).json({ status: 'error', msg: err }));
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  UserModel.loginUser(username)
    .then((user) => {
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err || !isMatch) {
          return res.status(401).json({ status: 'error', msg: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ status: 'success', token });
      });
    })
    .catch((err) => res.status(400).json({ status: 'error', msg: err }));
};
