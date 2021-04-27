const express = require('express')
const app = express()
const port = 3000

const handlebars = require('express-handlebars')

app.set('view engine', 'hbs')

// Points to the necessary files
app.engine('hbs', handlebars({
  layoutsDir: `${__dirname}/views/layouts`,
  extname: 'hbs',
  defaultLayout: 'index',
  partialsDir: `${__dirname}/views/partials`
}))

app.use(express.static('static'))

//Block helper
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
  console.log("main page")
})

app.get('/listEdit', (req, res) => {
   res.render('listEdit', {layout: 'index', bookList: fakeApi()})
   console.log("list edit page")
})

app.use('/addBook', (req, res) => {
  res.render('addBook', {layout: 'index'})
  console.log("addBook page")
})

app.use('*', (req, res) => {
  res.render('404')
  console.log('sike page not found')
})

//start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})

