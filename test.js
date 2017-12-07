var TrackDB = require('./db/UserDB');
var util = require('util');

TrackDB.getByPseudo('max').then((user) =>{
    
    console.log(util.inspect(user, false, null))
})
