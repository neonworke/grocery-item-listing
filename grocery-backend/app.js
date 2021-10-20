const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require("dotenv").config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECTION_STRING, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}, function (err){
    if(err) {
        console.log("Error in DB Connection", err);
    } else {
        console.log("Connection established");
    }
})

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const groceryItemsRouter = require('./routes/groceryItemsRoute');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/groceryItems", groceryItemsRouter);


module.exports = app;
