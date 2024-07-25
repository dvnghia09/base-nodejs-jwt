const express = require('express');
const router = express.Router();
const middleware = require("../middleware")
const uploadCloud = require("../config/cloudinary.config")

const productController = require("../controllers/product")


router.post('/create', middleware.verifyAdmin, uploadCloud.array('images'), productController.createProduct);

router.get('/find', productController.getProductByCondition);

router.put('/update', middleware.verifyAdmin, productController.update);

router.delete('/delete/:id', middleware.verifyAdmin, productController.delete);

router.put('/upload-image/:id', middleware.verifyAdmin, uploadCloud.array('images'), productController.uploadImage);

router.get('/:slug', productController.detail);


router.get('/', productController.getAll);


module.exports = router;