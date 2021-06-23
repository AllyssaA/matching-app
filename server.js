require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const handlebars = require('express-handlebars');

/* To retrieve the data from a form we need to handle the http request, instead of bodyparser we can use express.json() since express 4.xx */
app.use(express.json());
app.use(express.urlencoded());

// Points to the necessary files
app.engine('hbs', handlebars( {
	layoutsDir: `${__dirname}/views/layouts`,
	extname: 'hbs',
	defaultLayout: 'index',
	partialsDir: `${__dirname}/views/partials`
}));

app.set('view engine', 'hbs');
app.use(express.static('static'));

// import exported connect db function in ./mongoose file
const connectDBMongoose = require('./config/mongoose');
// call to connect DB function 
connectDBMongoose();

const route = require('./router/router.js');
app.use('/', route);


//start server
app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});




