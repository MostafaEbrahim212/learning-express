const express = require('express');
const router = express.Router();
const ProductsController = require('../controllers/ProductsController');
const { validationSchema } = require('../middlewares/validationSchema');
const { body } = require('express-validator');

router.route('/')
    .get(ProductsController.getProducts)
    .post(validationSchema(), ProductsController.addProduct);

router.route('/:id')
    .get(ProductsController.getProduct)
    .put(validationSchema(), ProductsController.updateProduct)
    .delete(ProductsController.deleteProduct);



module.exports = router;