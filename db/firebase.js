const firebase = require('firebase');
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

var adminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://santour-c0a51.firebaseio.com"
});


var app = firebase.initializeApp({
    apiKey: 'AIzaSyAyxKZs-u4YmmCAi8gqk13ghpEUYD7RgFI ',
    authDomain: 'santour-c0a51.firebaseapp.com',
    databaseURL: 'https://santour-c0a51.firebaseio.com/',
    storageBucket: 'gs://santour-c0a51.appspot.com'
});


var database = firebase.database();
var auth = firebase.auth();

var adminAuth = adminApp.auth();

module.exports = {
    database,
    auth,
    adminAuth
}