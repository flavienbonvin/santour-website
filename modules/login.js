var auth = require('../db/firebase').auth;

var self = module.exports = {
    login(email,password,session){
        return new Promise((resolve,reject) =>{
            auth.signInWithEmailAndPassword(email,password).then((res) =>{
                session.idUser = res.uid
                session.emailUser = email;
                resolve();
            }).catch((error) => {
                console.log(error);
                resolve();
            })
        })
    },
    logout(session){
        session.idUser = false;
    },
    addUser(email,password){
        return new Promise((resolve,reject) => {
            auth.createUserWithEmailAndPassword(email,password).then((res) => {
                resolve();
            }).catch((error) => {
                console.log(error);
                resolve();
            })
        })
    }
}