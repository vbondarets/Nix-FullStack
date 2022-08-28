const ApiError = require("../error/ApiError");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const Basket = require('../models/BasketModel');
const secureConfig = require('../secureConfig.json');

function jwtGenerator(id, login, email, role){
    const token = jwt.sign(
        {id: id, login: login, email: email, role: role}, 
        secureConfig.SECRET_KEY,
        {expiresIn: '12h'}
    );
    return token;
}

class UserController{
    async registration(req, res, next){
        let {login, email, password, role} = req.body;
        if (!login || !email || !password){
            return next(ApiError.conflict('Missing Data'));
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        if(!role){
            role = 'USER';
        }
        const user = new User(login, email, hashedPassword, role);
        user.create().then(resp =>{
            if(resp != "Created"){
                const error = resp.indexOf('login') != -1 ? 'login' : 'email';
                return next(ApiError.conflict(error + ' already exist'));
            }
            else if(resp == "Created"){
                const basket = new Basket(user.id);
                basket.create();
                
                const token = jwtGenerator(user.id, user.login, user.email, user.role);
                return res.json({token});

            }
            else{
                return next(ApiError.internal('Unknown err: '+ resp));
            }
        });


    }

    async login(req, res, next){
        const {id, login, email, password} = req.body;
        // console.log(login);
        // console.log(email);
        const user = new User();
        user.find(id, login, email).then(resp =>{
            if(resp == 'NOT FOUND'){
                return next(ApiError.badRequest(resp));
            }
            else if(user){
                let comparePassword = bcrypt.compareSync(password, user.password)
                if(!comparePassword){
                    return next(ApiError.conflict('Incorrect password'));
                }
                const token = jwtGenerator(user.id, user.login, user.email, user.role);
                return res.json({token});
            }
            else{
                console.log(resp);
                return next(ApiError.internal('Unknown error'));
            }
        });
    }
    async check(req, res, next){
        // res.json({user: req.user, res: "ok"});
        const token = jwtGenerator(req.user.id, req.user.login, req.user.email, req.user.role);
        return res.json({user: req.user , token: token});
    }
}
module.exports = new UserController();