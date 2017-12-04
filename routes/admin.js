var express = require('express');
var router = express.Router();
var trackDB = require('../db/TrackDB');
var userDB = require('../db/UserDB');

/* GET tracks page. */
router.get('/', function(req, res, next) {
    res.redirect('/admin/tracks')

});

router.get('/tracks', function(req, res, next) {
    trackDB.getAll().then(function(list) {
        res.render('admin/tracks', { title: 'Express', tracks : list });
    })

});


/*GET list of users*/
router.get('/users', function(req, res, next) {
    userDB.getAll().then(function(list) {
        console.log(list+"sandy");
        res.render('admin/users', { title: 'Express', users : list });
    })

});

router.get('/categories', function(req, res, next) {
    res.render('admin/categories');

});

router.get('/difficulties', function(req, res, next) {
    res.render('admin/difficulties');

});

router.get('/settings', function(req, res, next) {
    res.render('admin/settings');

});

module.exports = router;