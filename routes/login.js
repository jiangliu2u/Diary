var express = require('express');
var router = express.Router();
var model=require('../models/db');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('login');
});


router.post('/', function (req, res) {
    // if (User.find({username: req.body.username})) {
    //     res.render('error');
    // }
    var data = {
        username: req.body.username,
        password: req.body.password
    };
    model.user.find({'username':data.username,'password':data.password},function (err,docs) {
       if(err){
           res.redirect('/')
       }else {
           console.log(docs);
           req.session.user=docs[0].username;
           req.session.UserID=docs[0]._id;
           res.redirect('/users')
       }
    });

});
module.exports = router;
