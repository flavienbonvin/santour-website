var express = require('express');
var router = express.Router();
var login = require('../modules/login');
var userDB = require('../db/UserDB');


/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.session.idUser) {
        res.redirect('/admin');
    } else {
        res.render('admin/login');
    }

});

router.post('/', function (req, res, next) {
    login.login(req.body.username, req.body.password, req.session).then(() => {
        res.redirect('/admin');
    })

});

// reset password
router.get('/users/askResetPassword/:idAuth', function (req, res, next) {
    var idAuth = req.params.idAuth;
    userDB.findEmailByCredentials(idAuth).then((user) => {
        res.send('ok');
    })
})
router.get('/users/resetPassword/:idAuth', function (req, res, next) {
    res.render('resetpassword');
})
router.post('/users/resetPassword/:idAuth', function (req, res, next) {
    var idAuth = req.params.idAuth;
    userDB.resetPassword(req.body.password, idAuth).then(() => {
        res.redirect('/')
    })
})

router.get('/users/resetPasswordEmail/:email', function (req, res, next) {
    var email = req.params.email;
    userDB.getByEmail(email).then((user) => {
        console.log(user);
        res.redirect('/users/resetPassword/'+user.idAuth);
    })
})



module.exports = router;
