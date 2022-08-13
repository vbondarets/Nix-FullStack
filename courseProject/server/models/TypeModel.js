const Model = require('./model');
const pool = require('./db');

class Type extends Model {
    constructor(class_name, name, id ) {
        super('type');
        this.class_name = class_name;
        this.name = name;
        this.id = id;
    }
    create(){
        return pool.execute(`INSERT INTO type (class, name) values (?, ?)`, [this.class_name, this.name])
        .then((res) =>{
            this.id = res[0].insertId;
            console.log("Type Created");
            return "Created";    
        })
        .catch(err => {
            pool.end();
            console.error(err);
            return err;
        });
        
    }
    getAll(){
        return pool.execute(`SELECT * FROM type`)
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

module.exports = Type;