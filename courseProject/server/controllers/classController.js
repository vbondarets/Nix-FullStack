const ApiError = require('../error/ApiError');
const Class = require('../models/ClassModel');
// app.use(express.json());

class ClassController{
    async create(req, res, next){
        const _class = new Class(req.body.name);
        await _class.create().then(resp =>{
            if(resp == "Created"){
                return res.json({class: _class, resp: resp});
            }
            else{
                console.log(resp);
                return next(ApiError.conflict(resp))
            }
            
        });
    }
    async getAll(req, res, next){
        const _class = new Class();
        await _class.getAll().then(resp =>{
            if(resp == "NOT FOUND"){
                return next(ApiError.badRequest(resp));
            }
            else{
                return res.json({resp: resp});
            }
        });
    } 
    async getByClass(req, res, next){
        const _class = new Class(req.body.name);
        await _class.getAll().then(resp =>{
            if(resp == "NOT FOUND"){
                return next(ApiError.badRequest(resp));
            }
            else{
                return res.json({resp: resp});
            }
        });
    } 
}
module.exports = new ClassController();