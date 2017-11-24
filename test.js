var TrackDB = require('./db/TrackDB');

TrackDB.getAll().then((list) =>{
    
    console.log(list)
})
