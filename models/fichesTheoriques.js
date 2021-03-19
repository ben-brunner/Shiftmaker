var mongoose = require('mongoose')

var fichesTheoriquesSchema = mongoose.Schema({
    title: String,
    description: String,
    picto: String,
    pdfName: String
})

var fichesTheoriquesModel = mongoose.model('fichesThéoriques', fichesTheoriquesSchema)

module.exports = fichesTheoriquesModel