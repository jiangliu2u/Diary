let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {type: String},                    //用户
    password: {type: String}                       //密码
});


module.exports = UserSchema;