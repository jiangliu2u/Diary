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
            post_s = posts;
            res.render('index', {
                user: req.session.user,
                title: "日记",
                success: req.flash('success').toString(),
                posts: post_s.reverse()
            });
        }
    });
});

router.post('/', function (req, res) {//发表一篇日记
    if (req.body.content) {
        let date = new Date();
        const posts = {
            username: req.session.user.username,
            content: req.body.content,
            post_time: (date.getMonth() + 1) + '月' + date.getDate() + '日' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
        };
        const p = model.dialog(posts);
        p.save(function (err, docs) {
            if (err) {
                req.flash("error");
                res.redirect('/');
            }
            res.redirect('/');
        });
    } else {
        req.flash('error', '内容不能为空');
        res.redirect('/');
    }

});

module.exports = router;
