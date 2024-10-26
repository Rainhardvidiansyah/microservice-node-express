const express = require('express');
const router = express.Router();
const productcontroller = require('../controller/productcontroller');
const articleController = require('../controller/articlecontroller');
const authenticationController = require('../controller/authcontroller');
const tokenMiddleware = require('../middlewares/authmiddleware');
const getAndSaveUserActivity = require('../middlewares/logactivitymiddleware');

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
router.delete('/logout', tokenMiddleware.verifyToken, authenticationController.logout);


router.get('/test-middleware', tokenMiddleware.verifyToken, (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    res.status(200).send(`${req.email} memiliki token: ${refreshToken}`);
});

router.get('/test-header', (req, res) => {
    res.setHeader('x-custom-header', 'test');
    res.send('Hello from the head endpoint');
});

router.get('/test-cookie', (req, res) => {
    res.cookie('test', 'test_cookie', { expires: new Date(Date.now() + 900000), httpOnly: true });
    res.send('Cookie set');
});


router.get('/log-user', tokenMiddleware.verifyRefreshToken, tokenMiddleware.verifyToken, getAndSaveUserActivity, articleController.getAllArtice);


module.exports = router;