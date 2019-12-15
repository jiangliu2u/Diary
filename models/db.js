let mongoose = require('mongoose');
let DB_URL = 'mongodb://localhost:27017/dialog';
let Promise = require('bluebird');
/**
 * 连接
 */
let userSchema = require('./User');
let dialogSchema = require('./Dialog');
let db = mongoose.connect(DB_URL);

let obj = {};

obj.user = mongoose.model("User", userSchema);
obj.dialog = mongoose.model("Dialog", dialogSchema);

Promise.promisifyAll(obj.user);
Promise.promisifyAll(obj.dialog);


/**
 * 连接成功
 */
mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + DB_URL);
});

/**
 * 连接异常
 */
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: hhhh' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

module.exports = obj;