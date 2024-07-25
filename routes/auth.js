const express = require('express');
const router = express.Router();

const authController = require("../controllers/auth")


router.post('/register', authController.registerUser);

router.post('/login', authController.loginUser);

router.post('/refresh-token', authController.refreshToken);

router.post('/reset-password', authController.forgotPassword);


module.exports = router
