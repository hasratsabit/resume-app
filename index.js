const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/database');
const cors = require('cors');
const bodyParser = require('body-parser');
const mainRoute = require('./routes/index');


// Express initialized.
const app = express();

// Use ES6 Promise
mongoose.Promise = global.Promise;
// Database setup
mongoose.connect(config.uri, { useMongoClient: true }, (err) => {
	if(err){
		console.log('Could not connect to database: ', err);
	}else {
		console.log('Connected to database ' + config.db);
	}
});


// Cross Origin Permission
app.use(cors({ origin: 'http://localhost:4200'}))

// Middlewares
app.use(express.static(__dirname + '/client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));








app.use('/', mainRoute);
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/front/dist/index.html'));
})

// Server Port
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Running on port ${port}`);
})
