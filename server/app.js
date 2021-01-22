const express = require('express');
const mongoose = require('mongoose');
const { MONGOURI } = require('./keys');

const app = express();
const PORT = 3000;

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

app.use(require('./routes/auth'));
app.use(require('./routes/post'));