const Model = require('./model');
const pool = require('./db');

class Category extends Model {
    constructor(category_name, classId, id ) {
        super('category');
        this.category_name = category_name;
        this.classId = classId;
        this.id = id;
    }
    create(){
        return pool.execute(`INSERT INTO category (name, classId) values (?, ?)`, [this.category_name, this.classId])
        .then((res) =>{
            this.id = res[0].insertId;
            console.log("Category Created");
            return "Created";    
        })
        .catch(err => {
            pool.end();
            console.error(err);
            return err;
        });
        
    }
    getAll(){
        return pool.execute(`SELECT * FROM category ORDER BY classId`)
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
    getByType(name){
        return pool.execute(`SELECT * FROM category WHERE name="${name}`)
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

module.exports = Category;