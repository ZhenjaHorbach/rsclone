const express = require('express');
const mongoose = require('mongoose');
const { MONGOURI } = require('./keys');

const app = express();
const PORT = 5000;

mongoose.connect(MONGOURI, {
	useUnifiedTopology: true,
	useNewUrlParser: true
});

mongoose.connection.on('connected', () => {
	console.log('Mongo is working!!!');
});

mongoose.connection.on('error', () => {
	console.log('Mongo is not working!!!');
});

app.listen(PORT, () => {
	console.log('Server is working : ', PORT);
});

require('./models/user');
require('./models/post');

mongoose.model("User");
app.use(express.json());


if (process.env.NODE_ENV == "production") {
	app.use(express.static('client/build'))
	const path = require('path')
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

app.use(require('./routes/user'));
app.use(require('./routes/auth'));
app.use(require('./routes/post'));