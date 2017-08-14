var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('User');

var DialogSchema = new Schema({
    username: {type: String},
    content: {type: String},
    post_time: {type: String}
});
module.exports = mongoose.model('Dialog', DialogSchema);