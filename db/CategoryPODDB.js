var CategoryPOD = require('../models/CategoryPOD');
var firebase = require('./firebase').database;

var self = module.exports = {
    /**
     * @description Ajout un object de type category POD à la db
     * @param {CategoryPOD} object 
     */
    add(object) {
        return new Promise((resolve, reject) => {
            var newPostKey = firebase.ref('/category_pod').push().key;
            object.id = newPostKey;
            firebase.ref('/category_pod/'+newPostKey).set(object.convertToFirebase()).then(() => {
                resolve();
            })
        })
    },
    /**
     *  @description Update un object de type category POD à la db
     * @param {CategoryPOD} object 
     */
    update(object) {
        return new Promise((resolve, reject) => {
            firebase.ref('/category_pod/' + object.id).set(object.convertToFirebase()).then(() => {
                resolve();
            })
        })
    },
    /**
     * @description Supprime un object de type category POD à la db
     * @param {CategoryPOD} object 
     */
    delete(object) {
        return new Promise((resolve, reject) => {
            firebase.ref('/category_pod/' + object.id).remove().then(() => {
                resolve();
            })
        })
    },
    /**
     *  @description Retounre tous les objects de type category POD de la db
     * @returns {Promise<CategoryPOD[]>}
     */
    getAll() {
        return new Promise((resolve, reject) => {
            firebase.ref('/category_pod').once('value').then(function (objects) {
                var list = objects.val();
                var res = [];
                for (key in list) {
                    res[res.length] = self._createCategoryPOD(key,list[key]);
                }
                resolve(res);
            });
        })
    },
    /**
     * @description Recupere un object de type category POD de la db par son ID
     * @param {string} id 
     * @returns {Promise<CategoryPOD>}
     */
    getById(id){
        return new Promise((resolve, reject) => {
            firebase.ref('/category_pod/'+id).once('value').then(function (objects) {
                var obj = objects.val();
                var res  = self._createCategoryPOD(id, obj);
                resolve(res);
            });
        })
    },


    _createCategoryPOD(key, info) {
        var obj = new CategoryPOD(key, info['name']);
        return obj;
    }
}