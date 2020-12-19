var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser')
var cors = require('cors');

var app = express();

const route = require('./route/routes');

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/shoppinglist');

// on connectrion
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected at port 27017');
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});

const PORT = 3000;

app.use(cors());

app.use(bodyparser.json());

app.use('/api', route);

app.get('/', (req, res) => {
    res.send('some changes');
});

app.listen(PORT, () => {
    console.log('Server has been started at port: ' + PORT);
});
