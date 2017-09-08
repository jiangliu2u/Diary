const express = require('express');
const router = express.Router();
const model = require('../models/db');
const crypto = require("crypto");

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('register');
});


router.post('/', function (req, res) {
    // if (User.find({username: req.body.username})) {
    //     res.render('error');
    // }
    let md5 = crypto.createHash('md5');
    let pwd = md5.update(req.body.password).digest("hex");
    let data = {
        username: req.body.username,
        password: pwd
    };
    model.user.find({'username': data.username}, function (err, user) {
        console.log(user);
        if (user[0]) {
            req.flash('error', '用户已经存在');
            console.log("用户已经存在");
            return res.redirect('/reg');
        }
        else {
            let u = model.user(data);
            u.save(function (err, docs) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/login');
            });

        }
    })

});
module.exports = router;
