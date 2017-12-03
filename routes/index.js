var express = require('express');
var router = express.Router();
var trackDB = require('../db/TrackDB');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect('/admin')

});

module.exports = router;
