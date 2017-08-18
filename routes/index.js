var express = require('express');
var router = express.Router();
var model = require('../models/db');
/* GET home page. */
router.get('/', function (req, res) {

    //todo
    var post_s = [];
    var re=function(){res.render('index', {
        user: req.session.user,
        title: "日记",
        success: req.flash('success').toString(),
        error: req.flash('error').toString(),
        posts: post_s
    })};
    model.dialog.findAsync(function (err, posts) {
        if (err) {
            console.log('读取post出错' + err);
        } else {
            console.log('哈哈哈' + posts);
            post_s = posts;
        }

    }).then(res.render('index', {
        user: req.session.user,
        title: "日记",
        success: req.flash('success').toString(),
        error: req.flash('error').toString(),
        posts: post_s
    })).then(console.log(post_s+'memeda'));



});

router.post('/', function (req, res) {
    // if (User.find({username: req.body.username})) {
    //     res.render('error');
    // }
    var posts = {
        username: req.session.user.username,
        content: req.body.content,
        post_time: new Date()
    };
    var p = model.dialog(posts);
    p.save(function (err, docs) {
        if (err) {
            req.flash("error");
            res.redirect('/');
        }
        res.redirect('/');
    });
});

module.exports = router;
