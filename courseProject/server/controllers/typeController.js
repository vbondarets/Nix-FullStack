const ApiError = require('../error/ApiError');
const Type = require('../models/TypeModel');
// app.use(express.json());

class TypeController{
    async create(req, res, next){
        const type = new Type(req.body.class, req.body.name);
        await type.create().then(resp =>{
            if(resp == "Created"){
                return res.json({type: type, resp: resp});
            }
            else{
                console.log(resp);
                return next(ApiError.conflict(resp))
            }
            
        });
    }
    async getAll(req, res, next){
        const types = new Type();
        await types.getAll().then(resp =>{
            if(resp == "NOT FOUND"){
                return next(ApiError.badRequest(resp));
            }
            else{
                return res.json({resp: resp});
            }
        });
    } 
}
module.exports = new TypeController();