var express = require('express');
var router = express.Router();
var db = require('../models/db');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('register');
});


router.post('/', function (req, res) {
    // if (User.find({username: req.body.username})) {
    //     res.render('error');
    // }
    var data = {
        username: req.body.username,
        password: req.body.password
    };
    console.log(data);
    var user = new db.user(data);
    console.log(user);
    user.save(function (err) {
        if(err){
            console.log(err);
        }
        res.redirect('/');
    });


});
module.exports = router;
