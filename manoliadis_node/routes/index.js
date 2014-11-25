var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' })
});

router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('ttest');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});


/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var FirstName = req.body.FirstName;
	var LastName = req.body.LastName;
    var Email = req.body.Email;
    var Afm = req.body.Afm;
	
    // Set our collection
    var collection = db.get('ttest');

    // Submit to the DB
    collection.insert({
        "FirstName" : FirstName,
		"LastName"  : LastName,
		"email" 	: Email,
        "afm"     : Afm
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // Change address bar to /userlist
            res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

module.exports = router;



