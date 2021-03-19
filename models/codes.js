var mongoose = require("mongoose");

var codeSchema = mongoose.Schema({
    code: String
});

var codeModel = mongoose.model('codes', codeSchema);

module.exports = codeModel;