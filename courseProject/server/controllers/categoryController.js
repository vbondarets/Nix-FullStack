const ApiError = require('../error/ApiError');
const Category = require('../models/CategoryModel');
// app.use(express.json());

class CategoryController{
    async create(req, res, next){
        const category = new Category(req.body.name, req.body.classId);
        await category.create().then(resp =>{
            if(resp == "Created"){
                return res.json({category: category, resp: resp});
            }
            else{
                console.log(resp);
                return next(ApiError.conflict(resp))
            }
            
        });
    }
    async getAll(req, res, next){
        const category = new Category();
        await category.getAll().then(resp =>{
            if(resp == "NOT FOUND"){
                return next(ApiError.badRequest(resp));
            }
            else{
                return res.json({resp: resp});
            }
        });
    } 
    async getByCategory(req, res, next){
        const category = new Category(req.body.name);
        await category.getAll().then(resp =>{
            if(resp == "NOT FOUND"){
                return next(ApiError.badRequest(resp));
            }
            else{
                return res.json({resp: resp});
            }
        });
    } 
}
module.exports = new CategoryController();