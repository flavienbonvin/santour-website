var db = require('../db/firebase').database;
var trackDB = require('../db/TrackDB');
var fs = require('fs');


var self = module.exports = {
    exportToCSV(id){
        return new Promise((resolve,reject) =>{
            trackDB.getById(id).then((track) =>{
                //console.log(track);
                var stringTrack = JSON.stringify(track.convertToFirebase());
                var path = '/../public/export/'+Date.now()+".json"
                console.log(fs.writeFileSync(__dirname+path,stringTrack));
                resolve(path);
            })
        })
        
    }
}