require('dotenv').config()



const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Book = require('./models/book');

//... and then farther down the file
mongoose.connect('mongodb://localhost:27017/books', { useNewUrlParser: true});

// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))
// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())


const BookRouter = require('./routes/books')
app.use('/api/books',BookRouter)
var port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Magic happens on port ' + port);
});