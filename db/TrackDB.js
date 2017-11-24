var Track = require('../models/Track');
var firebase = require('./firebase');

var self = module.exports = {
    /**
     * 
     * @param {Track} object 
     */
    add(object) {
        return new Promise((resolve, reject) => {
            var newPostKey = firebase.database().ref('/tracks').push().key;
            object.id = newPostKey;
            firebase.ref('/tracks').set(object.convertToFirebase()).then(() => {
                resolve();
            })
        })
    },
    /**
     * 
     * @param {Track} object 
     */
    update(object) {
        return new Promise((resolve, reject) => {
            firebase.ref('/tracks/' + object.id).set(object.convertToFirebase()).then(() => {
                resolve();
            })
        })
    },
    /**
     * 
     * @param {Track} object 
     */
    delete(object) {
        return new Promise((resolve, reject) => {
            firebase.ref('/tracks/' + object.id).remove().then(() => {
                resolve();
            })
        })
    },
    getAll() {
        return new Promise((resolve, reject) => {
            firebase.ref('/tracks').once('value').then(function (objects) {
                var list = objects.val();
                var res = [];
                for (key in list) {
                    res[res.length] = self._createTrack(key,list[key]);
                }
                resolve(res);
            });
        })
    },


    _createTrack(key, info) {
        var obj = new Track(key, info['name'], info['pauseDuration'], info['isForEveryone'], info['difficulty'], info['idUser'], info['positions'], info['pods'], info['pois'], info['typeTrackID']);
        return obj;
    }
}