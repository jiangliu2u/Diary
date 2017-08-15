var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DialogSchema = new Schema({
    username: {type: String},
    content: {type: String},
    post_time: {type: String}
});

module.exports = DialogSchema;