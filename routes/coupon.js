const express = require('express');
const router = express.Router();
const middleware = require("../middleware")

const couponController = require("../controllers/coupon")


router.post('/create', middleware.verifyAdmin, couponController.create);

// router.put('/update', middleware.verifyAdmin, couponController.update);

router.get('/', couponController.getAll);

module.exports = router;