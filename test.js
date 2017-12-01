var TrackDB = require('./db/TrackDB');
var util = require('util');

TrackDB.getAll().then((list) =>{
    
    console.log(util.inspect(list, false, null))
})
