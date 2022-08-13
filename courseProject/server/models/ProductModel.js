const Model = require('./model');
const pool = require('./db');

class Product extends Model {
    constructor(name, price, img, typeId, rating, id) {
        super('product');
        this.name = name;
        this.price = price;
        this.img = img;
        this.typeId = typeId;
        this.rating = rating;
        this.id = id;
    }
    async create(){
        return pool.execute(`INSERT INTO product (name, price, img, typeId) VALUES (?, ?, ?, ?)`, [this.name, this.price, this.img, this.typeId])
        .then((res) =>{
            this.id = res[0].insertId;
            console.log("Product Created");
            return "Created";    
        })
        .catch(err => {
            pool.end();
            console.error(err);
            return err;
        });
        
    }
    getAll(typeId){
        if(!typeId){
            return pool.execute(`SELECT * FROM product`)
            .then(res => {
                if (res[0].length > 0) {
                    return res[0];
                } else {
                    return "NOT FOUND";
                }
            })
            .catch(err => {
                pool.end();
                console.error(err);
                return err;
            });
        }
        else if(typeId){
            return pool.execute(`SELECT * FROM product WHERE typeId=${typeId}`)
            .then(res => {
                if (res[0].length > 0) {
                    return res[0];
                } else {
                    return "NOT FOUND";
                }
            })
            .catch(err => {
                pool.end();
                console.error(err);
                return err;
            });
        }
        
    }
    async getOne(id){
        return pool.execute(`SELECT * FROM product WHERE id=${id}`)
        .then(res => {
            if (res[0].length > 0) {
                return res[0];
            } else {
                return "NOT FOUND";
            }
        })
        .catch(err => {
            pool.end();
            console.error(err);
            return err;
        });
    }
}

module.exports = Product;