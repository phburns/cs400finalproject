var express = require('express');
var router = express.Router();

// Route for the contact form page
router.get('/', function(req, res) {
    res.render('contactForm', { title: 'Contact Form' });
});

module.exports = router;