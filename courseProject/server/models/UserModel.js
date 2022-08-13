const Model = require('./model');
const pool = require('./db');

class User extends Model{
    constructor(login, email, password, role, id){
        super('user');
        this.login = login;
        this.email = email;
        this.password = password;
        this.role= role;
        this.id = id;
    }
    create(){
        return pool.execute(`INSERT INTO user (login, email, password, role) VALUES (?, ?, ?, ?)`, [this.login, this.email, this.password, this.role])
        .then(res =>{
            this.id = res[0].insertId;
            console.log("User Created");
            return "Created"; 
        })
        .catch(err=>{
            pool.end();
            console.log(err);
            return err.message;
        });
    }
    find(id, login, email){
        if(id){
            return pool.execute(`SELECT * FROM user WHERE id=${id}`)
            .then(res =>{
                if(res[0].length > 0){
                    return super.find(res[0][0]['id']);
                }
                else{
                    return "NOT FOUND";
                }
            })
            .catch(err =>{
                pool.end();
                console.log(err);
                return "NOT FOUND";
            });
        }
        else if(login){
            return pool.execute(`SELECT * FROM user WHERE login="${login}"`)
            .then(res =>{
                if(res[0].length > 0){
                    return super.find(res[0][0]['id']);
                }
                else{
                    return "NOT FOUND";
                }
            })
            .catch(err =>{
                pool.end();
                console.log(err);
                return "NOT FOUND";
            });
        }
        else if(email){
            return pool.execute(`SELECT * FROM user WHERE email="${email}"`)
            .then(res =>{
                if(res[0].length > 0){
                    return super.find(res[0][0]['id']);
                }
                else{
                    return "NOT FOUND";
                }
            })
            .catch(err =>{
                pool.end();
                console.log(err);
                return "NOT FOUND";
            });
        }
    }
}
module.exports = User;