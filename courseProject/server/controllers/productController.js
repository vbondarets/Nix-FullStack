const ApiError = require('../error/ApiError');
const Product = require('../models/ProductModel');
const ProductInfo = require('../models/ProductInfoModel');
const ProductPhoto = require('../models/ProductPhotoModel');
const uuid = require('uuid');
const path = require('path');

class ProductController{
    async create(req, res, next){
        const {img} = req.files;
        // console.log(img);
        let fileName = uuid.v4()+ ".jpg";
        img.mv(path.resolve(__dirname, "..", "static", fileName));
        let info = req.body.info;
        let product = new Product(req.body.name, req.body.count, req.body.price, fileName, req.body.classId, req.body.categoryId);
        await product.create().then(resp =>{
            if(resp == "Created"){
                if(info){
                    info = JSON.parse(info);
                    info.forEach(i => {
                        let productInfo = new ProductInfo(product.id, i.title, i.description);
                        productInfo.create().then(resp =>{
                            // console.log(resp);
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
        let {classId, categoryId, limit, page} = req.query;
        // page = page || 1;
        // limit = limit || 12;
        // let offset = page * limit - limit;
        if(!classId && !categoryId){
            await product.getAll(classId, categoryId, limit, page).then(resp =>{
                if(resp == "NOT FOUND"){
                    return next(ApiError.badRequest(resp));
                }
                else{
                    return res.json({products: resp});
                }
            });
        }
        else if(classId){
            await product.getAll(classId, categoryId, limit, page).then(resp =>{
                if(resp == "NOT FOUND"){
                    return next(ApiError.badRequest(resp));
                }
                else{
                    return res.json({products: resp});
                }
            });
        }
        else if(categoryId){
            await product.getAll(categoryId, classId, limit, page).then(resp =>{
                if(resp == "NOT FOUND"){
                    return next(ApiError.badRequest(resp));
                }
                else{
                    return res.json({products: resp});
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
                    productInfo.getByProdId(id).then( result=>{
                        
                        return res.json({product: resp, info: result});
                    });
                }
            });
        }
        else if(!id){
            return next(ApiError.badRequest("NO ID"));
        }
        
    } 
    async addPhoto(req, res, next){
        const {img} = req.files;
        let {id} = req.params;
        let fileName = uuid.v4()+ ".jpg";
        img.mv(path.resolve(__dirname, "..", "static", fileName));
        let photo = new ProductPhoto(fileName, id);
        await photo.create().then(result =>{
            if(result == "Created"){
                return res.json({photo: photo});
            }
            else{
                console.log(result);
                return next(ApiError.conflict(result))
            }
        })

    }
    async getPhotos(req, res, next){
        let photo = new ProductPhoto;
        let {id} = req.params;
        if(id){
            await photo.getByProdId(id).then(result => {
                if(result == "NOT FOUND"){
                    return next(ApiError.badRequest(result));
                }
                else{
                    return res.json({photos: result});
                }
            })
        }
        else if(!id){
            return next(ApiError.badRequest("NO ID"));
        }
    }
}
module.exports = new ProductController();