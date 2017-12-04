var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('admin/login');
});

router.post('/', function (req, res, next) {
    res.redirect('/admin');
});


module.exports = router;
