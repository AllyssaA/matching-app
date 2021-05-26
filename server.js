require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const handlebars = require('express-handlebars')

app.set('view engine', 'hbs')
app.use(express.static('static'))
/* To retrieve the data from a form we need to handle the http request, instead of bodyparser we can use express.json() since express 4.xx */
app.use(express.json())
app.use(express.urlencoded())

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

const route = require('./router/router.js');
app.use('/', route)
// ----

//start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})




