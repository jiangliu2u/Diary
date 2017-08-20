var express = require('express');
var router = express.Router();
var model = require('../models/db');
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
    model.user.find({'username': data.username}, function (err, user) {
        console.log(user);
        if (!user[0]) {
            req.flash('error', '用户不存在');
            console.log("用户不存在");
            return res.redirect('/login');
        }

        if (req.body.password != user[0].password) {
            console.log("输入的密码" + req.body.password);
            console.log("数据库的密码" + user[0].password);
            console.log("密码错误");
            req.flash('error', '用户名或密码错误');
            return res.redirect('/login');
        }
        req.session.user = user[0];
        console.log("sssss");
        req.flash('success', req.session.user.username + '登录成功');
        console.log('用户名' + req.session.user.username);
        res.redirect('/');
    });
});
module.exports = router;
