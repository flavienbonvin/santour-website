var Position = require('../models/Position');
var Track = require('../models/Track');
var POD = require('../models/Pod');
var POI = require('../models/Poi');
var RatePOD = require('../models/RatePod');

var firebase = require('./firebase').database;

var fs = require('fs');

var self = module.exports = {
    /**
     * @description insert track inside the db
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
     * @description update a track on the db
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
     * @description delete a track by id
     * @param {string} id 
     */
    delete(id) {
        return new Promise((resolve, reject) => {
            firebase.ref('/tracks/' + id).remove().then(() => {
                resolve();
            })
        })
    },
    /**
     * @description Get all trakcs from the db
     * @returns {Promise<Track[]>}
     */
    getAll() {
        return new Promise((resolve, reject) => {
            firebase.ref('/tracks').once('value').then(function (objects) {
                var list = objects.val();
                var res = [];
                for (key in list) {
                    res[res.length] = self._createTrack(key, list[key]);
                }
                resolve(res);
            });
        })
    },
    /**
     * @description get a track by id from the db
     * @param {string} id
     * @return {Promise<Track>}
     */
    getById(id) {
        return new Promise((resolve, reject) => {
            firebase.ref('/tracks/' + id).once('value').then(function (objects) {
                var obj = objects.val();
                var res = self._createTrack(id, obj);
                resolve(res);
            });
        })
    },


    _createTrack(key, info) {
        var positions = [];
        if (info['positions']) {
            for (var i = 0; i < info['positions'].length; i++) {
                positions.push(self._createPosition(info['positions'][i]));
            }
        }

        var pods = [];
        if (info['pods']) {
            for (var i = 0; i < info['pods'].length; i++) {
                pods.push(self._createPOD(info['pods'][i]));
            }
        }

        var pois = [];
        if (info['pois']) {

            for (var i = 0; i < info['pois'].length; i++) {
                pois.push(self._createPOI(info['pois'][i]));
            }
        }

        var duration = Math.floor(Number(info['duration']) / 1000);
        if (duration > 60) {
            var durationMinute = Math.floor(duration / 60);
            var durationSeconde = Math.floor(duration % 60);
            if (durationMinute > 60) {
                var durationHeure = Math.floor(durationMinute / 60);
                durationMinute = Math.floor(durationMinute % 60);
                if (durationHeure > 24) {
                    var durationJour = Math.floor(durationHeure / 24);
                    durationHeure = Math.floor(durationHeure % 24);
                    duration = durationJour + "j" + durationHeure + "h" + durationMinute + "m" + durationSeconde + "s";
                } else {
                    duration = durationHeure + "h" + durationMinute + "m" + durationSeconde + "s";
                }
            } else {
                duration = durationMinute + "m" + durationSeconde + "s";
            }
        } else {
            duration = duration + "s";
        }

        var obj = new Track(key, info['name'], info['distance'], info['duration'], duration, info['difficulty'], info['idUser'], positions, pods, pois);
        return obj;
    },
    _createPosition(info) {
        var obj = new Position(info['latitude'], info['longitude'], info['altitude'], info['time']);
        return obj;
    },
    _createPOD(info) {
        var position = self._createPosition(info['position']);
        var ratepods = [];
        for (var i = 0; i < info['categoriesID'].length; i++) {
            ratepods.push(self._createRatePOD(info['categoriesID'][i]));
        }

        //fs.writeFileSync('./test.png',info['picture'],{encoding: 'base64'});

        var obj = new POD(info['name'], info['description'], info['picture'], position, ratepods);
        return obj;
    },
    _createRatePOD(info) {
        var obj = new RatePOD(info['podCatID'], info['rate']);
        return obj;
    },
    _createPOI(info) {
        var position = self._createPosition(info['position']);
        var obj = new POI(info['name'], info['description'], info['picture'], position, info['categoriesID']);
        return obj;
    }

}