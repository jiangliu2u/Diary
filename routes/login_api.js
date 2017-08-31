const express = require('express');
const router = express.Router();
const model = require('../models/db');

const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:4200');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
};
router.use(allowCrossDomain);

router.post('/', function (req, res) {
    // if (User.find({username: req.body.username})) {
    //     res.render('error');
    // }
    let data = {
        username: req.body.username,
        password: req.body.password
    };
    console.log(data);
    model.user.find({'username': data.username}, function (err, user) {
        if (!user[0]) {
            console.log("用户不存在");
        }

        if (req.body.password != user[0].password) {
            console.log("输入的密码" + req.body.password);
            console.log("数据库的密码" + user[0].password);
            console.log("密码错误");
        }
        if(user[0]){
            res.json(data);
        }
        console.log("cccccccccc");
    });
});
module.exports = router;
