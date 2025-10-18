const { Router } = require('express');
const { createProduct, getAllProducts,getProductById,
    getProductByGender,getProductByCategory,
deleteProductById,getProductByCategoryId } = require('../controllers/productController');

const { signup, verifySignupOtp, login, verifyLoginOtp } = require("../controllers/userController");

const router = Router();

//User Router
router.post("/signup", signup);
router.post("/verify-signup", verifySignupOtp);
router.post("/login", login);
router.post("/verify-login", verifyLoginOtp);

//Product Router
router.post('/product', createProduct);
router.get('/all-product', getAllProducts);
router.get('/product/:id',getProductById)

router.get('/product/category/:category',getProductByCategory)
router.get('/product/category/id/:category/:id',getProductByCategoryId)

router.get('/product/gender/:gender',getProductByGender)

//Delete Product Router
router.delete('/product/delete/:id',deleteProductById)

module.exports = router;
