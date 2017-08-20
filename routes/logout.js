var express = require('express');
var router = express.Router();
var model = require('../models/db');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('logout');
});

module.exports = router;
