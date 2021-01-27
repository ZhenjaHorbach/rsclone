const express = require('express');
const mongoose = require('mongoose');
const { MONGOURI } = require('./keys');

const app = express();
const PORT = process.env.PORT || 5000;

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

require('./models/user');
require('./models/post');

mongoose.model("User");
app.use(express.json());

app.use(require('./routes/user'));
app.use(require('./routes/auth'));
app.use(require('./routes/post'));

if (process.env.NODE_ENV == 'production') {
	app.use(express.static('../app/build'));
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'app', 'build', 'index.html'))
	})
}

app.listen(PORT, () => {
	console.log('Server is working : ', PORT);
});