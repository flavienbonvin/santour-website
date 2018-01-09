var express = require('express');
var router = express.Router();
var trackDB = require('../db/TrackDB');
var userDB = require('../db/UserDB');
var categoryPOIDB = require('../db/CategoryPOIDB');
var categoryPODDB = require('../db/CategoryPODDB');
var login = require('../modules/login');
var exported = require('../modules/export');
var settings = require('../modules/settings');

var CategoryPOI = require('../models/CategoryPOI');
var CategoryPOD = require('../models/CategoryPOD');
var User = require('../models/User');

// check login
router.use((req, res, next) => {
    if (!req.session.idUser) {
        res.redirect("/");
    } else {
        res.locals.emailUser = req.session.emailUser;
        next();
    }
})

/*
----------------Tracks----------------
*/
router.get('/', function (req, res, next) {
    res.redirect('/admin/tracks')

});
/*GET list of tracks*/
router.get('/tracks', function (req, res, next) {
    trackDB.getAll().then(function (list) {
        res.render('admin/tracks', { title: 'Express', tracks: list });
    })

});

/*GET track by id*/
router.get('/tracks/:id', function (req, res, next) {
    var id = req.params.id;
    trackDB.getById(id).then(function (track) {
        console.log(track);
        console.log(track.pois.length);
        res.render('admin/track', { title: 'Express', track: track });
    })
});
router.get('/tracks/:id/removePoint/:index', (req,res,next) =>{
    var id = req.params.id;
    var index = req.params.index;
    trackDB.getById(id).then(function(track){
        track.positions.splice(index,1);
        trackDB.update(track).then(() =>{
            res.redirect('/admin/tracks/'+id);
        })
    })
})
router.get('/tracks/remove/:id', function (req, res, next) {
    trackDB.delete(req.params.id).then(() => {
        res.redirect('/admin/tracks');
    })
});
router.get("/tracks/exports/:id", function (req, res, next) {
    exported.exportToCSV(req.params.id).then((path) => {
        var newPath = path.replace('/../public', '');
        console.log(newPath);
        res.redirect(newPath);
    })
})


/*
----------------User----------------
*/

/*GET list of users*/
router.get('/users', function (req, res, next) {
    userDB.getAll().then(function (list) {
        res.render('admin/users', { title: 'Express', users: list });
    })
});

/*New user*/
router.get('/users/add', function (req, res, next) {
    res.render('admin/user_new');
});
router.post('/users/add', function (req, res, next) {
    userDB.add(new User(null, null, req.body.email, req.body.password, req.body.userType)).then(() => {
        res.redirect('/admin/users');
    })
})


/*GET user by id*/
router.get('/users/:id', function (req, res, next) {
    var id = req.params.id;
    userDB.getById(id).then(function (user) {
        res.render('admin/user', { title: 'Express', user: user });
    })
});
router.post('/users/:id', function (req, res, next) {
    var id = req.params.id;
    console.log(req.body);
    userDB.update(new User(id,req.body.idAuth,req.body.credentials,req.body.email,req.body.newpassword,req.body.userType)).then(function (user) {
        res.render('admin/user', { title: 'Express', user: user });
    })
});

router.get('/users/delete/:id', function (req, res, next) {
    var id = req.params.id;
    userDB.delete(id).then(() => {
        res.redirect('/admin/users')
    })
})

/*
----------------Categories----------------
*/


router.get('/categories', function (req, res, next) {
    categoryPOIDB.getAll().then(function (list) {
        res.render('admin/categories', { title: 'Express', categories: list });
    })
});
router.post('/categories', function (req, res, next) {
    categoryPOIDB.add(new CategoryPOI(null, req.body.name)).then(() => {
        categoryPOIDB.getAll().then(function (list) {
            res.render('admin/categories', { title: 'Express', categories: list });
        })
    })
})
router.get('/categories/remove/:id', function (req, res, next) {
    categoryPOIDB.delete(new CategoryPOI(req.params.id, "")).then(() => {
        res.redirect("/admin/categories");
    })
})
router.post('/categories/update/:id', function (req, res, next) {
    categoryPOIDB.update(new CategoryPOI(req.params.id, req.body.name)).then(() => {
        res.redirect("/admin/categories");
    })
})

/*
----------------Difficulties----------------
*/

router.get('/difficulties', function (req, res, next) {
    categoryPODDB.getAll().then(function (list) {
        res.render('admin/difficulties', { title: 'Express', difficulties: list });
    })
});
router.post('/difficulties', function (req, res, next) {
    categoryPODDB.add(new CategoryPOD(null, req.body.name)).then(() => {
        res.redirect("/admin/difficulties");
    })
})
router.get('/difficulties/remove/:id', function (req, res, next) {
    categoryPODDB.delete(new CategoryPOD(req.params.id, "")).then(() => {
        res.redirect("/admin/difficulties");
    })
})
router.post('/difficulties/update/:id', function (req, res, next) {
    categoryPODDB.update(new CategoryPOD(req.params.id, req.body.name)).then(() => {
        res.redirect("/admin/difficulties");
    })
})


/*
----------------Settings----------------
*/


router.get('/settings', function (req, res, next) {
    var info = settings.get();
    res.render('admin/settings', info);
});
router.post('/settings', function (req, res, next) {
    settings.save(req.body.myMinNumber, req.body.mySeekValue).then(() => {
        res.render('admin/settings');
    })

});

/*
----------------Logout----------------
*/

router.get('/logout', function (req, res, next) {
    login.logout(req.session);
    res.redirect('/');
})

module.exports = router;