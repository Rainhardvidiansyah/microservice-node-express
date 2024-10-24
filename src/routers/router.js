const express = require('express');
const router = express.Router();
const productcontroller = require('../controller/productcontroller');
const articleController = require('../controller/articlecontroller');
const authenticationController = require('../controller/authcontroller');
const tokenMiddleware = require('../middlewares/AuthMiddleware');

router.get('/api/v1/products', (req, res) => {
    res.send('oke di sini');
})


router.get('/all-products', productcontroller.getAllProduct);
router.get('/products/:id', productcontroller.getProductById);
router.post('/products/create', productcontroller.saveproduct)


//ARTICLES
router.get('/article/:id', articleController.getArticleById);
router.get('/all-articles', articleController.getAllArtice);

//AUTHENTICATION
router.post('/auth/login', authenticationController.login);
router.get('/auth/refresh-token', tokenMiddleware.verifyRefreshToken, authenticationController.createNewAccestToken);


router.get('/test-middleware', tokenMiddleware.veryfyToken, (req, res) => {
    res.status(200).send('Lolos, hei kamu... ' + req.email);
});

router.get('/testing-router', (req, res) => {
    res.status(200).send('Lolos');
});

router.get('/test-cookie', (req, res) => {
    res.cookie('test', 'test_cookie', { expires: new Date(Date.now() + 900000), httpOnly: true });
    res.send('Cookie set');
});



module.exports = router;