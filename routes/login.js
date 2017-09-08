
const express = require('express');
const router = express.Router();
const model = require('../models/db');
const crypto=require("crypto");

/* GET login page. */
router.get('/', function (req, res, next) {
    res.render('login');
});


router.post('/', function (req, res) {
    // if (User.find({username: req.body.username})) {
    //     res.render('error');
    // }
    let md5=crypto.createHash('md5');
    let pwd=md5.update(req.body.password).digest("hex");
    let data = {
        username: req.body.username,
        password: pwd
    };

    model.user.find({'username': data.username}, function (err, user) {
        if (!user[0]) {
            req.flash('error', '用户不存在');
            return res.redirect('/login');
        }

        if (req.body.password != user[0].password) {
            req.flash('error', '用户名或密码错误aaaa');
            return res.redirect('/login');
        }
        req.session.user = user[0];
        req.flash('success', req.session.user.username + '登录成功');
        return res.redirect('/');
    });
});
module.exports = router;
