var auth = require('../db/firebase').auth;
var userDB = require('../db/UserDB');

var self = module.exports = {
    login(email,password,session){
        return new Promise((resolve,reject) =>{
            auth.signInWithEmailAndPassword(email,password).then((res) =>{
                userDB.getByidAuth(res.uid).then((user) => {
                    if(user.typeUser != 'admin'){
                        resolve();
                        return;
                    }
                    session.user = user;
                    session.idUser = res.uid
                    session.emailUser = email;
                    resolve();
                })
                
            }).catch((error) => {
                console.log(error);
                resolve();
            })
        })
    },
    logout(session){
        session.idUser = false;
    }
}