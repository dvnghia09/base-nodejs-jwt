const express = require('express');
const router = express.Router();

const AuthRoutes = require('./auth');
const UserRoutes = require('./user');
const ProductRoutes = require('./product');
const CategoryRoutes = require('./category');
const CouponRoutes = require('./coupon');
const OrderRoutes = require('./order');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('index');
});


router.use('/api/user', UserRoutes);
router.use('/api/auth', AuthRoutes);
router.use('/api/product', ProductRoutes);
router.use('/api/category', CategoryRoutes);
router.use('/api/coupon', CouponRoutes);
router.use('/api/order', OrderRoutes);


module.exports = router;
