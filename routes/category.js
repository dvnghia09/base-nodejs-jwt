const express = require('express');
const router = express.Router();
const middleware = require("../middleware")
const createCategoryRequest = require('../request/createCategoryRequest');

const ValidateRequest = require('../utilities/requestValidate');

const categoryController = require("../controllers/category")


router.post('/create', middleware.verifyAdmin, createCategoryRequest.rules, ValidateRequest , categoryController.create);

router.put('/update', middleware.verifyAdmin, categoryController.update);

router.get('/', categoryController.getAll);

module.exports = router;