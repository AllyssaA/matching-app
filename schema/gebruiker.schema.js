const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gebruiker = new Schema({
    id: Schema.Types.ObjectId,
    naam: String,
    interesses: String
})

module.exports = gebruiker