const express = require('express');
/* middleware voor endpoints. nodig om dit extern  */
const router = express.Router(); 
const mongoose = require('mongoose'); 
// const { post } = require('../schema/boek.schema');
const boek = require('../schema/boek.schema');
const gebruiker = require('../schema/gebruiker.schema');


// collection, schema
const newBoek = mongoose.model('book', boek);
const newGebruiker = mongoose.model('user', gebruiker);

// functie die data pakt en deze opslaat in mongoDB
async function saveData (data) {
	try {
		let newBook = new newBoek( {
			titel: data.titel,
			auteur: data.auteur,
			genre: data.genre,
			entryDate: Date()
		});
		await newBook.save();
		console.log(`added book ${newBook}`);
	} catch (error) {
		console.log('saveData failed ' + error);
	}
}

// functie die boekenlijst ophaalt
async function getBooks() {
	try{
		// lean() transforms mongoose object to json object
		const data = await newBoek.find().lean();
		return data;
	} catch (error) {
		console.log('getBooks failed ' + error);
	}
}

//functie die gebruiker ophaalt
async function getUser() {
	try {
		const user = await newGebruiker.find().lean();
		console.log('User loaded from database');
		return user;
	} catch (error) {
		console.log('getUser failed ' + error);
	}
}

// function remove a book
router.post('/deleteBook', async (req, res) => {
	try {
		await newBoek.deleteOne( {
			_id: req.body.id
		});
		res.render('listEdit', {
			layout: 'index',
			boeken: await getBooks()
		});
	} catch (error) {
		console.log('Deleting book failed ' + error);
	}
});

// update boek
// Async zodat Mongoose het document kan ophale en aanpassen
router.post('/updateBoek', async (req, res) => {
	try {
		await newBoek.findOneAndUpdate( {
			titel: req.body.id
		}, {
			titel: req.body.titel, 
			auteur: req.body.auteur, 
			genre: req.body.genre
		});
		res.redirect('/listedit');
	} catch (error) {
		console.log(error);
		res.send('YOU FAILED');
	}
});
  
// laad de main page in met boekenlijst en gebruiker
router.get('/', async (req, res) => {
	try {
		res.render('main', {
			layout: 'index',
			boeken: await getBooks(),
			user: await getUser()
		});
	} catch (error) {
		console.log('Rendering index page failed ' + error);
	}
});

// laad boekenlijst in
router.get('/listedit', async (req, res) => {
	console.log('list books');
	try {
		res.render('listEdit', {
			layout: 'index',
			boeken: await getBooks()
		});
	} catch (error) {
		console.log('Loading list of books failed ' + error);
	}
});

// laad form om boek toe te voegen
router.get('/addbook', (req, res) => {
	try {
		console.log('rendering addbook page');
		res.render('addBook', {
			layout: 'index'
		});
	} catch (error) {
		console.log('Could not load addbook page');
	} 
});

// verstuurt de data naar database
router.post('/addbook', async (req, res) => {
	try {
		console.log('rendering addBook page');
		const data = {
			titel: req.body.titel,
			auteur: req.body.auteur,
			genre: req.body.genre
		};
		await saveData(data);
		res.render('listEdit', {
			layout: 'index',
			boeken: await getBooks()
		});
	} catch (error) {
		console.log('Adding book failed ' + error);
	}
});

// sike!
router.use((req, res) => {
	res.status(404).render('404');
	console.log('sike 🤷‍♀️, page doesn\'t exist, check path');
});

module.exports = router;