var express = require('express');
var router = express.Router();
var trackDB = require('../db/TrackDB');
var userDB = require('../db/UserDB');
var categoryPOIDB = require('../db/CategoryPOIDB');
var categoryPODDB = require('../db/CategoryPODDB');

/* GET tracks page. */
router.get('/', function(req, res, next) {
    res.redirect('/admin/tracks')

});

router.get('/tracks', function(req, res, next) {
    trackDB.getAll().then(function(list) {
        res.render('admin/tracks', { title: 'Express', tracks : list });
    })

});

router.get('/tracks/track=:id', function(req, res, next) {
    var id = req.params.id;
    console.log("REQUEST GET TRACK DETAILS OF :"+id);
    res.render('admin/track');

});



/*GET list of users*/
router.get('/users', function(req, res, next) {
    userDB.getAll().then(function(list) {
        console.log(list+"sandy");
        res.render('admin/users', { title: 'Express', users : list });
    })

});

router.get('/categories', function(req, res, next) {
    categoryPOIDB.getAll().then(function (list) {
        res.render('admin/categories', {title: 'Express', categories : list});
    })


});

router.get('/difficulties', function(req, res, next) {
    categoryPODDB.getAll().then(function (list) {
        res.render('admin/difficulties', {title: 'Express', difficulties : list});
    })

});

router.get('/settings', function(req, res, next) {
    res.render('admin/settings');

});

module.exports = router;