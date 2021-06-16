const express = require('express')
// middleware voor endpoints. nodig om dit extern
const router = express.Router()

const mongoose = require('mongoose')
const { post } = require('../schema/boek.schema')
const boek = require('../schema/boek.schema')
const gebruiker = require('../schema/gebruiker.schema')


// collection, schema
const newBoek = mongoose.model('book', boek)
const newGebruiker = mongoose.model('user', gebruiker)

// functie die data pakt en deze opslaat in mongoDB
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

// functie die boekenlijst ophaalt
async function getBooks() {
  // lean() transforms mongoose object to json object
  const data = await newBoek.find().lean()
  return data
}

//functie die gebruiker ophaalt
async function getUser() {
  const user = await newGebruiker.find().lean()
  console.log(user)
  return user
}

// function remove a book
router.post('/deleteBook', async (req, res) => {
  console.log(req.body.id)
  newBoek.deleteOne({
    _id: req.body.id
  }, (err) => {
    if (err) return console.log(err)
  })
  res.render('listEdit', {
    layout: 'index',
    boeken: await getBooks()
  })
})


// update boek
router.post('/updateBook', (req, res, next) => {

  })

// laad de main page in met boekenlijst en gebruiker
router.get('/', async (req, res) => {
  console.log('index')
  res.render('main', {
      layout: 'index',
      boeken: await getBooks(),
      user: await getUser()
  })
})

// laad boekenlijst in
router.get('/listedit', async (req, res) => {
    console.log('list books')

  try {
    res.render('listEdit', {
      layout: 'index',
      boeken: await getBooks()
    })
  } catch (error) {
    if (err) return handleError(err)
  }
})

// laad form om boek toe te voegen
router.get('/addbook', (req, res) => {
  console.log('rendering addbook')
  res.render('addBook', {
    layout: 'index'
  })
 
})

// verstuurt de data naar database
router.post('/addbook', (req, res) => {
  console.log('rendering addBook page')
  const data = {titel: req.body.titel, auteur: req.body.auteur, genre: req.body.genre}
  saveData(data)
  res.render('addBook', {
    layout: 'index'
  })
})

// sike!
router.use((req, res, next) => {
    res.status(404).render('404')
    console.log("sike 🤷‍♀️, page doesn't exist, check path")
  })

module.exports = router