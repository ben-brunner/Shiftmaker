var mongoose = require('mongoose')

var fichesActivitesSchema = mongoose.Schema({
    title: String,
    description: String,
    duration: Number,
    digital: Boolean,
    keyword: String
      
})

var fichesActivitesModel = mongoose.model('fichesActivités', fichesActivitesSchema)

module.exports = fichesActivitesModel