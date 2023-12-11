var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('ToDo', { title: 'ToDo List', CHAT_KEY: process.env.CHAT_KEY });
});

module.exports = router;