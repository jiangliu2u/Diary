var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String},                    //用户
    password: {type: Number}                       //密码
});


module.exports = mongoose.model('User', UserSchema);