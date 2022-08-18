import {makeAutoObservable} from "mobx";

export default class ProductStore{
    constructor(){
        this._types = [
            {id: 1, class : "Bags", name: "Bag for laptop"},
            {id: 3, class : "Bags", name: "Bag for camera"}
        ]
        this._products = [

        ]
        makeAutoObservable(this)
    }
    setProducts(products){
        this._products = products;
    }
    setTypes(types){
        this._types = types;
    }
    get Products(){
        return this._products
    }
    get Types(){
        return this._types
    }
}