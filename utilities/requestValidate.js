const { validationResult } = require('express-validator/check');

const  ValidateRequest = (req, res, next) => {
    try {
      validationResult(req).throw();
      next();
    } catch (err) {
      res.status(422).json({
        error: true,
        status: 422,
        message: 'Unprocessable Entity',
        data: {
          errors: err.array()
        }
      });
    }
}

module.exports = ValidateRequest;