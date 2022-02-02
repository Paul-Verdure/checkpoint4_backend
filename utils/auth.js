const jwt = require('jsonwebtoken');

require('dotenv').config();

const generateJwt = (
  email,
  isAdmin,
) => jwt.sign(
  {
    email,
    isAdmin,
  },
  process.env.JWT_SECRET,
);

module.exports = {
  generateJwt,
};
