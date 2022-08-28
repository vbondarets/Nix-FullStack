const Router = require('express');
const ClientController = require('../clientController/ClientController');
const router = new Router();

router.get('/', ClientController.toShop);
router.get('/css/index.css', ClientController.toShopCss);
router.get('/js/index.js', ClientController.toShopJs);
router.get('/product/:id', ClientController.toProduct);
router.get('/css/product.css', ClientController.toProductCSS);
router.get('/js/product.js', ClientController.toProductJs);


module.exports = router;