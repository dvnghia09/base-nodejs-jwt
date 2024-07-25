const { body } = require('express-validator/check');

module.exports = {
  rules: [
    body('name')
    .custom(value => {
      if (!value) {
        throw new Error('name cannot be empty!');
      }
      
      return true;
    }),
  ]
};
