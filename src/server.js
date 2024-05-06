const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const path = require('node:path');

const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

const app = express();

const DEVLOPEMENT = process.env.NODE_ENV !== 'production' ? true : false;

const serverConfig = require('./config/serverConfig');
const dbConfig = require('./config/databaseConfig');

// DB Connection
mongoose.connect(dbConfig.url)
.then(() => console.log("Connected to Database..."))
.catch( err => console.log(err, "Error connecting to Database..."))

// app Setup
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');
app.set('layout', './layouts/default');
app.use(expressLayouts);

app.use('/static', express.static('public'));
app.use(express.urlencoded({extended : true}));

app.use(session({
    secret: serverConfig.sessionSecret,
    resave: false ,
    saveUninitialized: true ,
  }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// Middlewares
const methodOvveriding = require('./middleware/methodOverrideMiddleware');
const morgan = require('morgan');

app.use(methodOvveriding('_methhod'));

if(DEVLOPEMENT){
    app.use(morgan('dev'));
}else{
    app.use(morgan('short'));
}

// Routes
const shopRouter = require('./router/shopRouter')

app.use(shopRouter)

// Error Handling
if(!DEVLOPEMENT){
    app.use( (err, req, res, next) => {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    });
}

// start erver
app.listen(serverConfig.port, serverConfig.host, () => {
    console.log(`Server running on: http://${serverConfig.host}:${serverConfig.port}`)
})