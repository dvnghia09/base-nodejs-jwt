const express = require('express');
const router = express.Router();
const middleware = require("../middleware")

const orderController = require("../controllers/order")


router.post('/create', middleware.verifyToken, orderController.createOrder);

router.put('/update-status/:id', middleware.verifyAdmin, orderController.updateStatus)

router.get('/user/:id', middleware.verifyToken, orderController.getByUser)

router.get('/', middleware.verifyAdmin, orderController.getAll)





module.exports = router;