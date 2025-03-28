const secureRandomPassword = require('secure-random-password');

const generatePassword = () => {
  return secureRandomPassword.randomPassword({
    length: 6,
    characters: [
      secureRandomPassword.lower,
      secureRandomPassword.upper,
      secureRandomPassword.digits,
      secureRandomPassword.symbols,
    ],
  });
};

module.exports = { generatePassword };