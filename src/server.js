const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();

const serverConfig = require('./config/serverConfig');
const dbConfig = require('./config/databaseConfig');

// DB Connection
mongoose.connect(dbConfig.url)
.then(() => console.log("Connected to Database..."))
.catch( err => console.log(err, "Error connecting to Database..."))

// app Setup
app.set('view engine', 'ejs');
app.set('layout', './layouts/default');
app.use(expressLayouts);
app.use('/static', express.static('public'));

// Middlewares

// Routes

// Error Handling

// start erver
app.listen(serverConfig.port, serverConfig.host, () => {
    console.log(`Server running on: http://${serverConfig.host}:${serverConfig.port}`)
})