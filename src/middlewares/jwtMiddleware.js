import jwt from 'jsonwebtoken';

let JWT_SECRET = 'DGAMES'; // Khóa bí mật JWT

// Tạo JWT từ thông tin người dùng
let generateToken = (user) => {
  let payload = {
    id: user._id,
    username: user.username,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

// Xác minh tính hợp lệ của token
let verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

module.exports = { generateToken, verifyToken };
