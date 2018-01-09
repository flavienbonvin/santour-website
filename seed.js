var User = require('./models/User');
var userDB = require('./db/UserDB');
var trackDB = require('./db/TrackDB');
var catPOIDB = require('./db/CategoryPOIDB');
var catPODDB = require('./db/CategoryPODDB');


var u = new User(null,null,"default@default.com","password","admin");


deleteAllTrack().then(() => {
    deleteAllPOD().then(() => {
        deleteAllPOI().then(() => {
            deleteAllUser().then(() => {
                userDB.add(u).then(() => {
                    console.log('fini');
                })
            })
        })
    })
})

function deleteAllTrack(){
    return new Promise((resolve,reject) => {
        trackDB.getAll().then((tracks) => {
            var promArr = [];
            for(var i = 0;i<tracks.length;i++){
                promArr.push(trackDB.delete(tracks[i].id));
            }
            Promise.all(promArr).then(() => {
                resolve();
            })
        })
    })
}
function deleteAllPOD(){
    return new Promise((resolve,reject) => {
        catPODDB.getAll().then((list) => {
            var promArr = [];
            for(var i = 0;i<list.length;i++){
                promArr.push(catPODDB.delete(list[i]));
            }
            Promise.all(promArr).then(() => {
                resolve();
            })
        })
    })
}
function deleteAllPOI(){
    return new Promise((resolve,reject) => {
        catPOIDB.getAll().then((list) => {
            var promArr = [];
            for(var i = 0;i<list.length;i++){
                promArr.push(catPOIDB.delete(list[i]));
            }
            Promise.all(promArr).then(() => {
                resolve();
            })
        })
    })
}
function deleteAllUser(){
    return new Promise((resolve,reject) => {
        userDB.getAll().then((list) => {
            var promArr = [];
            for(var i = 0;i<list.length;i++){
                promArr.push(userDB.delete(list[i].id));
            }
            Promise.all(promArr).then(() => {
                resolve();
            })
        })
    })
}