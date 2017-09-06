const express = require('express');
const router = express.Router();
const model = require('../models/db');
/* GET home page. */

router.get('/', function (req, res) {

    model.dialog.find(function (err, posts) {
        let post_s = [];
        if (err) {
            console.log('读取post出错' + err);
        } else {
            console.log('哈哈哈' + posts);
            post_s = posts;
            res.render('index', {
                user: req.session.user,
                title: "日记",
                success: req.flash('success').toString(),
                error: req.flash('error').toString(),
                posts: post_s.reverse()
            });
        }
    });
});

router.post('/', function (req, res) {//发表一篇日记
    // if (User.find({username: req.body.username})) {
    //     res.render('error');
    // }
    let date = new Date();
    const posts = {
        username: req.session.user.username,
        content: req.body.content,
        post_time: (date.getMonth()+1) + '月' + date.getDate() + '日' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    };
    const p = model.dialog(posts);
    p.save(function (err, docs) {
        if (err) {
            req.flash("error");
            res.redirect('/');
        }
        res.redirect('/');
    });
});

module.exports = router;
