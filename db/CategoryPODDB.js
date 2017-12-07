var CategoryPOD = require('../models/CategoryPOD');
var firebase = require('./firebase');

var self = module.exports = {
    /**
     * 
     * @param {CategoryPOD} object 
     */
    add(object) {
        return new Promise((resolve, reject) => {
            var newPostKey = firebase.database().ref('/category_pod').push().key;
            object.id = newPostKey;
            firebase.ref('/category_pod').set(object.convertToFirebase()).then(() => {
                resolve();
            })
        })
    },
    /**
     * 
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
     * 
     * @param {CategoryPOD} object 
     */
    delete(object) {
        return new Promise((resolve, reject) => {
            firebase.ref('/category_pod/' + object.id).remove().then(() => {
                resolve();
            })
        })
    },
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