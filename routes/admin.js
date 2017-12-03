var express = require('express');
var router = express.Router();
var trackDB = require('../db/TrackDB');

/* GET tracks page. */
router.get('/', function(req, res, next) {
    res.redirect('/admin/tracks')

});

router.get('/tracks', function(req, res, next) {
    trackDB.getAll().then(function(list) {
        res.render('admin/tracks', { title: 'Express', tracks : list });
    })

});

router.get('/users', function(req, res, next) {
    res.render('admin/users');

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