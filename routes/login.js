const express = require('express');
const router = express.Router();
const model = require('../models/db');
const crypto = require("crypto");

/* GET login page. */
router.get('/', function (req, res, next) {
    res.render('login',
        {
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        }
    );
});


router.post('/', function (req, res) {
    let md5 = crypto.createHash('md5');
    let pwd = md5.update(req.body.password).digest("hex");
    let data = {
        username: req.body.username,
        password: pwd
    };

    model.user.find({'username': data.username}, function (err, user) {
        if (!user[0]) {
            req.flash('error', '用户不存在');
            return res.redirect('/login');
        }

        else if (pwd != user[0].password) {
            req.flash('error', '密码错误');
            return res.redirect('/login');
        }
        else {
            req.session.user = user[0];
            req.flash('success', req.session.user.username + '登录成功');
            return res.redirect('/');
        }
    });
});
module.exports = router;
