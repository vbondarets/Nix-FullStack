const Model = require('./model');
const pool = require('./db');


class Product extends Model {
    constructor(name, count, price, img, classId, categoryId, rating, id) {
        super('product');
        this.name = name;
        this.count = count;
        this.price = price;
        this.img = img;
        this.classId = classId;
        this.categoryId = categoryId;
        this.rating = rating;
        this.id = id;
    }
    async create(){
        return pool.execute(`INSERT INTO product (name, count, price, img, classId, categoryId) VALUES (?, ?, ?, ?, ?, ?)`, [this.name, this.count, this.price, this.img, this.classId, this.categoryId])
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
    getAll(classId, categoryId, limit, page){
        if(!classId && !categoryId){
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
        else if(classId){
            return pool.execute(`SELECT * FROM product WHERE classId=${classId}`)
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
        else if(categoryId){
            return pool.execute(`SELECT * FROM product WHERE categoryId=${categoryId}`)
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