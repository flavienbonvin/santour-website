
var User = require('../models/User');
var firebase = require('./firebase').database;
var auth = require('./firebase').auth;
var adminAuth = require('./firebase').adminAuth;
var Cryptr = require('cryptr');
var cryptr = new Cryptr('secretkey');
var email = require('../modules/mail');

var self = module.exports = {
    /**
     * @description Add a user to database and firebase auth
     * @param {User} object 
     */
    add(object) {
        return new Promise((resolve, reject) => {
            console.log(object);
            auth.createUserWithEmailAndPassword(object.email, object.password).then((res) => {
                var newPostKey = firebase.ref('/users').push().key;
                object.id = newPostKey;
                object.idAuth = res.uid;
                object.password = cryptr.encrypt(object.password);
                firebase.ref('/users/' + newPostKey).set(object.convertToFirebase()).then(() => {
                    resolve();
                })
            }).catch((error) => {
                console.log(error);
                resolve();
            })

        })
    },
    /**
     * @description Update a user on the database and firbase auth
     * @param {User} object 
     */
    update(object) {
        return new Promise((resolve, reject) => {
            console.log(object);
            if (object.password != "") {
                self.getById(object.id).then((userInDB) => {
                    auth.signInWithEmailAndPassword(object.email, object.password).then((user) => {
                        user.updatePassword(object.password).then(() => {
                            firebase.ref('/users/' + object.id).set(object.convertToFirebase()).then(() => {
                                resolve();
                            })
                        })
                    })
                });
            } else {
                firebase.ref('/users/' + object.id).set(object.convertToFirebase()).then(() => {
                    resolve();
                })
            }


        })
    },
    /**
     * @description Reset the password from a user identified by an idAuth
     * @param {string} newPassword 
     * @param {string} idAuth 
     */
    resetPassword(newPassword, idAuth) {
        return new Promise((resolve, reject) => {
            self.getByidAuth(idAuth).then((object) => {
                auth.signInWithEmailAndPassword(object.email, object.password).then((user) => {
                    console.log(newPassword)
                    user.updatePassword(newPassword).then(() => {
                        object.password = cryptr.encrypt(newPassword);
                        firebase.ref('/users/' + object.id).set(object.convertToFirebase()).then(() => {
                            resolve();
                        })
                    })
                })
            })
        })
    },
    /**
     * @description delete a user from the database and the firebase auth
     * @param {string} id 
     */
    delete(id) {
        return new Promise((resolve, reject) => {
            self.getById(id).then((object) => {
                auth.signInWithEmailAndPassword(object.email, object.password).then((user) => {
                    user.delete().then(() => {
                        firebase.ref('/users/' + object.id).remove().then(() => {
                            resolve();
                        })
                    })
                })
            })
        })
    },
    /**
     * @description get all users from the database
     * @returns {Promise<User[]>}
     */
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
    /**
     * @description get a user by id
     * @param {string} id 
     * @returns {Promise<User>}
     */
    getById(id) {
        return new Promise((resolve, reject) => {
            firebase.ref('/users/' + id).once('value').then(function (objects) {
                var obj = objects.val();
                var res = self._createUser(id, obj);
                resolve(res);
            });
        })
    },
    /**
     * @description find a user by pseudo
     * @param {string} pseudo 
     * @returns {Promise<User>}
     */
    getByPseudo(pseudo) {
        return new Promise((resolve, reject) => {
            var ref = firebase.ref("/users");
            ref.orderByChild("pseudo").equalTo(pseudo).on("child_added", function (snapshot) {
                var u = self._createUser(snapshot.key, snapshot.val());
                resolve(u);
            });
        })
    },
    /**
     * @description Get a user by email
     * @param {*} email 
     * @returns {Promise<User>}
     */
    getByEmail(email) {
        return new Promise((resolve, reject) => {
            var ref = firebase.ref("/users");
            
            ref.orderByChild("email").equalTo(email).on("child_added", function (snapshot) {
                console.log('ici');
                console.log(snapshot);
                var u = self._createUser(snapshot.key, snapshot.val());
                resolve(u);
            });
        })
    },
    /**
     * @description get a user by idAuth
     * @param {*} idAuth 
     * @return {Promise<User>}
     */
    getByidAuth(idAuth) {
        return new Promise((resolve, reject) => {
            var ref = firebase.ref("/users");
            ref.orderByChild("idAuth").equalTo(idAuth).on("child_added", function (snapshot) {
                console.log('in');
                var u = self._createUser(snapshot.key, snapshot.val());
                resolve(u);
            });
        })
    },
    /**
     * @description send an email to the account to reset password
     * @param {string} idAuth 
     */
    findEmailByCredentials(idAuth) {
        return new Promise((resolve, reject) => {
            self.getByidAuth(idAuth).then((object) => {
                email.createEmail(object.email, "reset your password", 'here is the link to reset your password <a href="http://localhost:3000/users/resetPassword/' + object.idAuth + '">link</a>').then(() => {
                    resolve();
                })
            })
        })
    },


    _createUser(key, info) {
        var obj = new User(key, info['idAuth'], info['email'], cryptr.decrypt(info['password']), info['typeUser']);
        return obj;
    }
}