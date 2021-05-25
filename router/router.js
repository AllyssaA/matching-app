const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const list = require('../schema/list.schema')


app.get('/', (req, res) => {
    res.render('main', {layout: 'index', bookList: fakeApi()})
    console.log("rendering main page ")
  })
  
  app.get('/listedit', (req, res) => {
     res.render('listedit', {layout: 'index', bookList: fakeApi()})
     console.log("rendering list edit page")
  })
  
  app.use('/addbook', (req, res) => {
    res.render('addbook', {layout: 'index'})
    console.log("rendering addBook page")
  })
  
  app.use(function (req, res, next){
      res.status(404).render('404')
    console.log("sike, page doesn't exist, check path")
  })