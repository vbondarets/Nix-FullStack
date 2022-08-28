const ApiError = require('../error/ApiError');
const path = require('path');


class ClientController{
    async toShop(req, res){
        res.sendFile(path.join(__dirname, '../../client/html/index.html'));
    }
    async toShopCss(req, res){
        res.sendFile(path.join(__dirname, '../../client/css/index.css'));
    }
    async toShopJs(req, res){
        res.sendFile(path.join(__dirname, '../../client/js/index.js'));
    }
    async toProduct(req, res){
        res.sendFile(path.join(__dirname, '../../client/html/product.html'));
    }
    async toProductCSS(req, res){
        res.sendFile(path.join(__dirname, '../../client/css/product.css'));
    }
    async toProductJs(req, res){
        res.sendFile(path.join(__dirname, '../../client/js/product.js'));
    }
}

module.exports = new ClientController();