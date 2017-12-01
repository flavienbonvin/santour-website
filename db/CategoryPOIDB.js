var CategoryPOI = require('../models/CategoryPOI');
var firebase = require('./firebase');

var self = module.exports = {
    /**
     * 
     * @param {CategoryPOI} object 
     */
    add(object) {
        return new Promise((resolve, reject) => {
            var newPostKey = firebase.database().ref('/category_poi').push().key;
            object.id = newPostKey;
            firebase.ref('/category_poi').set(object.convertToFirebase()).then(() => {
                resolve();
            })
        })
    },
    /**
     * 
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
     * 
     * @param {CategoryPOI} object 
     */
    delete(object) {
        return new Promise((resolve, reject) => {
            firebase.ref('/category_poi/' + object.id).remove().then(() => {
                resolve();
            })
        })
    },
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


    _createCategoryPOI(key, info) {
        var obj = new CategoryPOI(key, info['name']);
        return obj;
    }
}