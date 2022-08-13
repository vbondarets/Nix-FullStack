const Model = require('./model');
const pool = require('./db');

class ProductInfo extends Model {
    constructor(product_id, title, description, id) {
        super('product_info');
        this.product_id = product_id;
        this.title = title;
        this.description = description;
        this.id = id;
    }
    async create(){
        return pool.execute(`INSERT INTO product_info (product_id, title, description) values (?, ?, ?)`, [this.product_id, this.title, this.description])
        .then(resp => {
            this.id = resp[0].insertId;
            console.log("ProductInfo Created");
            return "Created";  
        })   
        .catch (err => {
            pool.end();
            console.error(err);
            return err;
        });
        
    }
    async getByProdId(id){
        return pool.execute(`SELECT * FROM product_info WHERE product_id=${id}`)
        .then(resp => {
            if (resp[0].length > 0) {
                return super.find(resp[0][0]['id']);
            } else {
                return "NOT FOUND";
            }
        })
        .catch(err =>{
            pool.end();
            console.error(err);
            return err;
        });
    }
}
module.exports = ProductInfo;