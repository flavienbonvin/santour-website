var express = require('express');
var router = express.Router();
var trackDB = require('../db/TrackDB');


/* GET home page. */
router.get('/', function (req, res, next) {
  trackDB.getAll().then((list) => {
    res.render('index', { title: 'Express', tracks : list });
  })

});

module.exports = router;
