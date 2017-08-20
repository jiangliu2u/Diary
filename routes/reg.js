const express = require('express');
const router = express.Router();
const model = require('../models/db');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('register');
});


router.post('/', function (req, res) {
    // if (User.find({username: req.body.username})) {
    //     res.render('error');
    // }
   const data = {
        username: req.body.username,
        password: req.body.password
    };
    const u = model.user(data);
    u.save(function (err, docs) {
        if (err) {

        }
        res.redirect('/');
    });
});
module.exports = router;
