const express = require('express')
// middleware voor endpoints. nodig om dit extern
const router = express.Router()

const mongoose = require('mongoose')
const boek = require('../schema/boek.schema')
// const gebruiker = require('../schema/gebruiker.schema')


// collection, schema
const newBoek = mongoose.model('book', boek)

// functie die data pakt en deze opslaat in mongoose
function saveData(data) {
  let newBook = new newBoek({
      titel: data.titel,
      auteur: data.auteur,
      genre: data.genre,
      entryDate: Date()
  })

  newBook.save((err) => {
    console.log(`${newBook}`)
    if (err) return handleError(err)
  })
}

async function getBooks() {
  // lean() transforms mongoose object to json object
  const data = await newBoek.find().lean()
  return data
}

router.get('/', async (req, res) => {
  console.log(await getBooks())
  res.render('main',{
      layout: 'index',
      boeken: await getBooks()
  })
})

router.get('/listedit', async (req, res) => {
  res.render('listedit', {
    layout: 'index',
    boeken: await getBooks()
  })
  console.log(`rendering listedit`)
})

router.get('/addbook', (req, res) => {
res.render('addbook', {layout: 'index'})
})

router.post('/addbook', (req, res) => {
  console.log("rendering addBook page")
  const data = {titel: req.body.titel, auteur: req.body.auteur, genre: req.body.genre}
  saveData(data)
  res.render('addbook', {layout: 'index'})
})
    
router.use((req, res, next) => {
    res.status(404).render('404')
    console.log("sike 🤷‍♀️, page doesn't exist, check path")
  })

  module.exports = router