const express = require('express');
const router = express.Router();
const model = require('../models/db');
/* GET home page. */

//解决跨域访问问题，允许angular对本服务器进行访问。
const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:80800');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
};
router.use(allowCrossDomain);
router.get('/', function (req, res) {
    model.dialog.find(function (err, posts) {
        let post_s = [];
        if (err) {
            console.log('读取post出错:' + err);
        } else {
            post_s = posts;
            res.json(post_s);
        }
    });
});

module.exports = router;
