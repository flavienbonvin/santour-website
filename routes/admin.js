var express = require('express');
var router = express.Router();
var trackDB = require('../db/TrackDB');
var userDB = require('../db/UserDB');
var categoryPOIDB = require('../db/CategoryPOIDB');
var categoryPODDB = require('../db/CategoryPODDB');
var login = require('../modules/login');
var exported = require('../modules/export');

var CategoryPOI = require('../models/CategoryPOI');
var CategoryPOD = require('../models/CategoryPOD');

router.use((req,res,next) =>{
    if(!req.session.idUser){
        res.redirect("/");
    }else{
        res.locals.emailUser = req.session.emailUser;
        next();
    }  
})

/*
----------------Tracks----------------
*/
router.get('/', function(req, res, next) {
    res.redirect('/admin/tracks')

});
/*GET list of tracks*/
router.get('/tracks', function(req, res, next) {
    trackDB.getAll().then(function(list) {
        res.render('admin/tracks', { title: 'Express', tracks : list });
    })

});

/*GET track by id*/
router.get('/tracks/:id', function(req, res, next) {
    var id = req.params.id;
    trackDB.getById(id).then(function(track) {
        console.log(track);
        console.log(track.pois.length);
        res.render('admin/track', { title: 'Express', track : track });
    })
});
router.get('/tracks/remove/:id', function(req, res, next) {
    trackDB.delete(req.params.id).then(() => {
        res.redirect('/admin/tracks');
    })
});
router.get("/tracks/exports/:id",function(req,res,next) {
    exported.exportToCSV(req.params.id).then((path) => {
        var newPath = path.replace('/../public','');
        console.log(newPath);
        res.redirect(newPath);
    })
})



/*GET list of users*/
router.get('/users', function(req, res, next) {
    userDB.getAll().then(function(list) {
        res.render('admin/users', { title: 'Express', users : list });
    })
});

/*New user*/
router.get('/users/add', function(req, res, next) {
    res.render('admin/user_new');
});


/*GET user by id*/
router.get('/users/:id', function(req, res, next) {
    var id = req.params.id;
    console.log("REQUEST GET USER DETAILS OF :"+id);
    userDB.getById(id).then(function(user) {
        res.render('admin/user', { title: 'Express', user : user });
    })
});


/*
----------------Categories----------------
*/


router.get('/categories', function(req, res, next) {
    categoryPOIDB.getAll().then(function (list) {
        res.render('admin/categories', {title: 'Express', categories : list});
    })
});
router.post('/categories', function(req,res,next){
    categoryPOIDB.add(new CategoryPOI(null,req.body.name)).then(() =>{
        categoryPOIDB.getAll().then(function (list) {
            res.render('admin/categories', {title: 'Express', categories : list});
        })
    })
})
router.get('/categories/remove/:id',function(req,res,next) {
    categoryPOIDB.delete(new CategoryPOI(req.params.id,"")).then(() => {
        res.redirect("/categories");
    })
})

/*
----------------Difficulties----------------
*/

router.get('/difficulties', function(req, res, next) {
    categoryPODDB.getAll().then(function (list) {
        res.render('admin/difficulties', {title: 'Express', difficulties : list});
    })
});
router.post('/difficulties',function(req,res,next) {
    categoryPODDB.add(new CategoryPOD(null,req.body.name)).then(() => {
        res.redirect("/difficulties");
    })
})
router.get('/difficulties/remove/:id',function(req,res,next) {
    categoryPODDB.delete(new CategoryPOD(req.params.id,"")).then(() => {
        categoryPODDB.getAll().then(function (list) {
            res.render('admin/difficulties', {title: 'Express', difficulties : list});
        })
    })
})


router.get('/settings', function(req, res, next) {
    res.render('admin/settings');
});


router.get('/logout', function(req,res,next){
    login.logout(req.session);
    res.redirect('/');
})

module.exports = router;