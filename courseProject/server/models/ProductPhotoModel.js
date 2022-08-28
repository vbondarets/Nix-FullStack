const Model = require('./model');
const pool = require('./db');

class ProductPhoto extends Model {
    constructor(img, product_id, id) {
        super('product_photo');
        this.img = img;
        this.product_id = product_id;
        this.id = id;
    }
    async create(){
        return pool.execute(`INSERT INTO product_photo (img, product_id) values (?, ?)`, [this.img, this.product_id])
        .then(resp => {
            this.id = resp[0].insertId;
            console.log("ProductPhoto Created");
            return "Created";  
        })   
        .catch (err => {
            console.error(err);
            return err;
        });
        
    }
    getByProdId(id){
        return pool.execute(`SELECT * FROM product_photo WHERE product_id=${id}`)
        .then(resp => {
            if (resp[0].length > 0) {
                return resp[0];
                // return super.find(resp[0][0]['id']);
            } else {
                return "NOT FOUND";
            }
        })
        .catch(err =>{
            console.error(err);
            return err;
        });
    }
}
module.exports = ProductPhoto;