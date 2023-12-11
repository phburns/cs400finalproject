var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('map', { title: 'Map', API_KEY: process.env.API_KEY });
});

module.exports = router;
