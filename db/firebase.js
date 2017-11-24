const firebase = require('firebase');

var app = firebase.initializeApp({
    apiKey: 'AIzaSyAyxKZs-u4YmmCAi8gqk13ghpEUYD7RgFI ',
    authDomain: 'santour-c0a51.firebaseapp.com',
    databaseURL: 'https://santour-c0a51.firebaseio.com/',
    storageBucket: 'gs://santour-c0a51.appspot.com'
});

var database = firebase.database();


module.exports = database;