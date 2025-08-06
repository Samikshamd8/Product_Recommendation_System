const db = require('../../db.js');
const bcrypt = require('bcryptjs');

exports.registerUser = (username, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
        if (err) {
          reject("Username already exists or DB error");
        } else {
          resolve("User registered successfully");
        }
      });
    } catch (err) {
      reject("Hashing error");
    }
  });
};

exports.loginUser = (username) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
      if (err || results.length === 0) {
        reject("User not found");
      } else {
        resolve(results[0]);
      }
    });
  });
};
