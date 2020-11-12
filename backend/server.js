// mongo "mongodb+srv://cluster0.tngec.mongodb.net/book-recommender" --username ds_joy
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// database connection
const uri = 'mongodb+srv://ds_joy:isBn9789@cluster0.tngec.mongodb.net/book-recommender?retryWrites=true&w=majority';

mongoose.connect(uri, {useNewUrlParser: true,  useUnifiedTopology: true});
const connection = mongoose.connection;

connection.on('open', () => {
    console.log('connected....');
});


// starting the server
app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});