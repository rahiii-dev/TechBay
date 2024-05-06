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
const methodOvveriding = require('./middleware/methodOverrideMiddleware');
const morgan = require('morgan');

app.use(methodOvveriding('_methhod'));

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
    app.use(morgan('dev'));
}else{
    app.use(morgan('short'));
}

// Routes
app.get('/', (req, res) => {
    res.send("Hello");
})
// Error Handling

// start erver
app.listen(serverConfig.port, serverConfig.host, () => {
    console.log(`Server running on: http://${serverConfig.host}:${serverConfig.port}`)
})