const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

if(process.env.ENV === 'Test'){
    console.log('This is a test');
    const db  = mongoose.connect('mongodb://localhost/bookApi_Yama');
}
else {
    console.log('This is for real');
    const db = mongoose.connect('mongodb://localhost/bookApi_Prod');
}

const Book = require("./models/bookModel");
// const bookRouter = express.Router();
const bookRouter = require('./routes/bookRouter')(Book);

const port = process.env.PORT || 3000;



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use("/api", bookRouter);





app.get('/', (req, res) => {

    res.send("Welcome to my api! Kat Deluna!");

});


app.server = app.listen(port, () => {
    console.log(`Running on ${port}`);
});

module.exports = app;