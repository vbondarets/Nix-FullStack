const Model = require('./model');
const pool = require('./db');

class Basket extends Model {
    constructor (user_id, id){
        super('basket');
        this.user_id = user_id;
        this.id = id;
    }
    create(){
        pool.execute(`INSERT INTO basket (user_id) VALUES (?)`, [this.user_id])
        .then(res=>{
            this.id = res[0].insertId;
            console.log("Basket Created");
            return "Created";
        })
        .catch(err=>{
            pool.end();
            console.log(err);
            return err;
        });
    }
}
module.exports = Basket;