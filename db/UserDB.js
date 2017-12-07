var User = require('../models/User');
var firebase = require('./firebase');

var self = module.exports = {
    /**
     * 
     * @param {User} object 
     */
    add(object) {
        return new Promise((resolve, reject) => {
            var newPostKey = firebase.database().ref('/users').push().key;
            object.id = newPostKey;
            firebase.ref('/users').set(object.convertToFirebase()).then(() => {
                resolve();
            })
        })
    },
    /**
     * 
     * @param {User} object 
     */
    update(object) {
        return new Promise((resolve, reject) => {
            firebase.ref('/users/' + object.id).set(object.convertToFirebase()).then(() => {
                resolve();
            })
        })
    },
    /**
     * 
     * @param {User} object 
     */
    delete(object) {
        return new Promise((resolve, reject) => {
            firebase.ref('/users/' + object.id).remove().then(() => {
                resolve();
            })
        })
    },
    getAll() {
        return new Promise((resolve, reject) => {
            firebase.ref('/users').once('value').then(function (objects) {
                var list = objects.val();
                var res = [];
                for (key in list) {
                    res[res.length] = self._createUser(key, list[key]);
                }
                resolve(res);
            });
        })
    },
    getById(id) {
        return new Promise((resolve, reject) => {
            firebase.ref('/users/' + id).once('value').then(function (objects) {
                var obj = objects.val();
                var res = self._createUser(id, obj);
                resolve(res);
            });
        })
    },
    getByPseudo(pseudo) {
        return new Promise((resolve, reject) => {
            var ref = firebase.ref("/users");
            ref.orderByChild("pseudo").equalTo(pseudo).on("child_added", function (snapshot) {
                var u = self._createUser(snapshot.key,snapshot.val());
                resolve(u);
            });
        })
    },


    _createUser(key, info) {
        var obj = new User(key, info['pseudo'], info['email'], info['password'], info['typeUser']);
        return obj;
    }
}