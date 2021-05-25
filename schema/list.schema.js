const mongoose = require('mongoose')
const Schema = mongoose.Schema

const list = new Schema({
    titel: String,
    auteur: String,
    genre: String

})

module.exports = list