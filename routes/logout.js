const express = require('express');
const router = express.Router();
const model = require('../models/db');
/* GET home page. */
router.get('/', function (req, res, next) {
    req.session.user = null;
    req.flash('success', "退出成功");
    res.redirect('/');
});

module.exports = router;
