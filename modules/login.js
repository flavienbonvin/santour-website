var auth = require('../db/firebase').auth;
var userDB = require('../db/UserDB');

var self = module.exports = {
    /**
     * @description try to login with email and password. if we can connect, we save id inside the session
     * @param {string} email 
     * @param {string} password 
     * @param {*} session 
     */
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
    /**
     * @description We reset the session of the current user
     * @param {*} session 
     */
    logout(session){
        session.idUser = false;
    }
}