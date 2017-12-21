var express = require('express');
var router = express.Router();
var login = require('../modules/login');


/* GET home page. */
router.get('/', function (req, res, next) {
    if(req.session.idUser){
        res.redirect('/admin');
    }else{
        res.render('admin/login');
    }
    
});

router.post('/', function (req, res, next) {
    login.login(req.body.username,req.body.password,req.session).then(() => {
        res.redirect('/admin');
    })
    
});


module.exports = router;
