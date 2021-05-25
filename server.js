require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const handlebars = require('express-handlebars')

app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')
app.use(express.static('static'))

// Points to the necessary files
app.engine('hbs', handlebars({
  layoutsDir: `${__dirname}/views/layouts`,
  extname: 'hbs',
  defaultLayout: 'index',
  partialsDir: `${__dirname}/views/partials`
}))

// import exported connect db function in ./mongoose file
const connectDBMongoose = require('./config/mongoose')
// call to connect DB function 
connectDBMongoose()

//Block helper https://www.youtube.com/watch?v=HxJzZ7fmUDQ&list=LL&index=1&t=686s
const fakeApi = () => {
  return [
    {
      titel: 'A monster calls',
      auteur: 'Patrick Ness',
      genre: 'Sci-Fi'
    },
    {
      titel: '1984',
      auteur: 'George Orwell',
      genre: 'Fantasy novel'
    },
    {
      titel: 'When they call you a terrorist',
      auteur: 'Patrisse Cullors',
      genre: 'Biography'
    }

  ]
}

app.get('/', (req, res) => {
  res.render('main', {layout: 'index', bookList: fakeApi()})
  console.log("rendering main page ")
  })
  

/* 
Error: Failed to lookup view "listedit" in views directory "/app/views
*/

app.get('/listedit', (req, res) => {
  res.render('listedit', {layout: 'index', bookList: fakeApi()})
  console.log("rendering list edit page")
  })
  
app.get('/addbook', (req, res) => {
  res.render('addbook', {layout: 'index'})
  console.log("rendering addBook page")
  })
  
app.use((req, res, next) => {
  res.status(404).render('404')
  console.log("sike 🤷‍♀️, page doesn't exist, check path")
  })

//start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})




