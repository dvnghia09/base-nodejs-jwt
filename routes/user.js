const express = require('express');
const router = express.Router();
const middleware = require("../middleware")

const userController = require("../controllers/user")


router.get('/', middleware.verifyAdmin, userController.getAll);

router.put('/add-cart', middleware.verifyToken, userController.handleCart);



module.exports = router;