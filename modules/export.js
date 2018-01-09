var db = require('../db/firebase').database;
var trackDB = require('../db/TrackDB');
var categoryPOD = require('../db/CategoryPODDB');
var categoryPOI = require('../db/CategoryPOIDB');
var fs = require('fs');


var self = module.exports = {
    /**
     * @description this function allow you to export a track in the JSON format
     * @param {string} id 
     * @returns {Promise<string>}
     */
    exportToCSV(id) {
        return new Promise((resolve, reject) => {
            trackDB.getById(id).then((track) => {
                //console.log(track);
                categoryPOD.getAll().then((podList) => {
                    categoryPOI.getAll().then((poiList) => {
                        for (var i = 0; i < track.pods.length; i++) {
                            track.pods[i].picture = 'https://firebasestorage.googleapis.com/v0/b/santour-c0a51.appspot.com/o/' + track.pods[i].picture.replace('/', '%2F') + '?alt=media';
                            for (var j = 0; j < track.pods[i].categoriesID.length; j++) {
                                console.log(track.pods[i].categoriesID[j].podCatID);
                                track.pods[i].categoriesID[j].podCatID = findInPODs(track.pods[i].categoriesID[j].podCatID, podList);
                                console.log(track.pods[i].categoriesID[j].podCatID);
                            }
                        }
                        for (var i = 0; i < track.pois.length; i++) {
                            track.pois[i].picture = 'https://firebasestorage.googleapis.com/v0/b/santour-c0a51.appspot.com/o/' + track.pois[i].picture.replace('/', '%2F') + '?alt=media';
                            for (var j = 0; j < track.pois[i].categoriesID.length; j++) {
                                track.pois[i].categoriesID[j] = findInPODs(track.pois[i].categoriesID[j], poiList);
                            }
                        }

                        var stringTrack = JSON.stringify(track.convertToFirebase());
                        var path = '/../public/export/' + Date.now() + ".json"
                        console.log(fs.writeFileSync(__dirname + path, stringTrack));
                        resolve(path);
                    })
                })
            })
        })

    }
}


function findInPODs(search, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id == search) {
            return arr[i].name;
        }
    }
    return 'unknown';
}