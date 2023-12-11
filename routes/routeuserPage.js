var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    // Create a placeholder user object
    var user = {
        firstName: 'First',
        lastName: 'Last'
    };

    // Pass the user object to the view
    res.render('userPage', { title: 'userPage', user: user });
});

module.exports = router;