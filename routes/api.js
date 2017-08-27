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
            console.log('哈哈哈' + {posts});
            post_s = posts;
            res.json(post_s);
        }
    });
});

module.exports = router;