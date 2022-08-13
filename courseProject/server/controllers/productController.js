const ApiError = require('../error/ApiError');
const Product = require('../models/ProductModel');
const ProductInfo = require('../models/ProductInfoModel')
const uuid = require('uuid');
const path = require('path');

class ProductController{
    async create(req, res, next){
        const {img} = req.files;
        let fileName = uuid.v4()+ ".jpg";
        img.mv(path.resolve(__dirname, "..", "static", fileName));
        let info = req.body.info;
        let product = new Product(req.body.name, req.body.price, fileName, req.body.typeId);
        await product.create().then(resp =>{
            if(resp == "Created"){
                if(info){
                    info = JSON.parse(info);
                    info.forEach(element => {
                        let productInfo = new ProductInfo(product.id, i.title, i.description);
                        productInfo.create().then(resp =>{
                            console.log(resp);
                        });
                    });
                    
                }
                return res.json({product: product, resp: resp});
            }
            else{
                console.log(resp);
                return next(ApiError.conflict(resp))
            }
        });

    }
    async getAll(req, res, next){
        let product = new Product();
        let {typeId, limit, page} = req.query;
        // page = page || 1;
        // limit = limit || 12;
        // let offset = page * limit - limit;
        if(!typeId){
            await product.getAll().then(resp =>{
                if(resp == "NOT FOUND"){
                    return next(ApiError.badRequest(resp));
                }
                else{
                    return res.json({resp: resp});
                }
            });
        }
        else if(typeId){
            await product.getAll(typeId).then(resp =>{
                if(resp == "NOT FOUND"){
                    return next(ApiError.badRequest(resp));
                }
                else{
                    return res.json({resp: resp});
                }
            });
        }
        
    } 
    async getOne(req, res, next){
        let product = new Product();
        let {id} = req.params;
        if(id){
            await product.getOne(id).then(resp =>{
                if(resp == "NOT FOUND"){
                    return next(ApiError.badRequest(resp));
                }
                else{
                    let productInfo = new ProductInfo();
                    productInfo.getByProdId(id);
                    return res.json({resp: resp, info: productInfo});
                }
            });
        }
        else if(!id){
            return next(ApiError.badRequest("NO ID"));
        }
        
    } 
}
module.exports = new ProductController();