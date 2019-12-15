let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let DialogSchema = new Schema({
    username: {type: String},
    content: {type: String},
    post_time: {type: String}
});

module.exports = DialogSchema;