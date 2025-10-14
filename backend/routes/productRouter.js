const { Router } = require('express');
const { createProduct, getAllProducts } = require('../controllers/productController');

const router = Router();

router.post('/product', createProduct);
router.get('/all-product', getAllProducts);

module.exports = router;
