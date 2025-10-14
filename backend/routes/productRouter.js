const { Router } = require('express');
const { createProduct, getAllProducts,getProductById,
    getProductByGender,getProductByCategory,
deleteProductById } = require('../controllers/productController');

const router = Router();

router.post('/product', createProduct);
router.get('/all-product', getAllProducts);
router.get('/product/:id',getProductById)
router.get('/product/category/:category',getProductByCategory)
router.get('/product/gender/:gender',getProductByGender)
router.delete('/product/delete/:id',deleteProductById)

module.exports = router;
