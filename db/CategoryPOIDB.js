var CategoryPOI = require('../models/CategoryPOI');
var firebase = require('./firebase').database;

var self = module.exports = {
    /**
     * @description Add a category poi to database
     * @param {CategoryPOI} object 
     */
    add(object) {
        return new Promise((resolve, reject) => {
            var newPostKey = firebase.ref('/category_poi').push().key;
            object.id = newPostKey;
            firebase.ref('/category_poi/'+newPostKey).set(object.convertToFirebase()).then(() => {
                resolve();
            })
        })
    },
    /**
     * @description update a category poi on the database
     * @param {CategoryPOI} object 
     */
    update(object) {
        return new Promise((resolve, reject) => {
            firebase.ref('/category_poi/' + object.id).set(object.convertToFirebase()).then(() => {
                resolve();
            })
        })
    },
    /**
     * @description delete a category poi on the database
     * @param {CategoryPOI} object 
     */
    delete(object) {
        return new Promise((resolve, reject) => {
            firebase.ref('/category_poi/' + object.id).remove().then(() => {
                resolve();
            })
        })
    },
    /**
     * @description get all categories poi from the db
     * @returns {Promise<CategoryPOI[]>}
     */
    getAll() {
        return new Promise((resolve, reject) => {
            firebase.ref('/category_poi').once('value').then(function (objects) {
                var list = objects.val();
                var res = [];
                for (key in list) {
                    res[res.length] = self._createCategoryPOI(key,list[key]);
                }
                resolve(res);
            });
        })
    },
    /**
     * @description get a catergory poi by id
     * @param {string} id 
     * @returns {Promise<CategoryPOI>}
     */
    getById(id){
        return new Promise((resolve, reject) => {
            firebase.ref('/category_poi/'+id).once('value').then(function (objects) {
                var obj = objects.val();
                var res  = self._createCategoryPOI(id, obj);
                resolve(res);
            });
        })
    },


    _createCategoryPOI(key, info) {
        var obj = new CategoryPOI(key, info['name']);
        return obj;
    }
}