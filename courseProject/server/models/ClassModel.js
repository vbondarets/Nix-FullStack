const Model = require('./model');
const pool = require('./db');

class Class extends Model {
    constructor(class_name, id ) {
        super('class');
        this.class_name = class_name;
        this.id = id;
    }
    create(){
        return pool.execute(`INSERT INTO class (name) values (?)`, [this.class_name])
        .then((res) =>{
            this.id = res[0].insertId;
            console.log("Class Created");
            return "Created";    
        })
        .catch(err => {
            console.error(err);
            return err;
        });
        
    }
    getAll(){
        return pool.execute(`SELECT * FROM class ORDER BY id`)
        .then(res => {
            if (res[0].length > 0) {
                return res[0];
            } else {
                return "NOT FOUND";
            }
        })
        .catch(err => {
            console.error(err);
            return err;
        });
    }
    getByType(name){
        return pool.execute(`SELECT * FROM class WHERE name="${name}`)
        .then(res => {
            if (res[0].length > 0) {
                return res[0];
            } else {
                return "NOT FOUND";
            }
        })
        .catch(err => {
            console.error(err);
            return err;
        });
    }
}

module.exports = Class;