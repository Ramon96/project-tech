// import dependencies
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var hbs = require('express-handlebars');
var expressValidator = require('express-validator');
var expressSession = require('express-session');


// define routes
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var editpfRouter = require('./routes/editprofile');
var signupRouter = require('./routes/signup');
var matchingRouter = require('./routes/match');

// put express application in app variable
var app = express();

// setup engine and views
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// assign express dependencies
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(expressSession({secret: 'max', saveUninitialized: false, resave: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// assign routes
app.use('/', indexRouter);
app.use('/edit', editpfRouter);
app.use('/signup', signupRouter);
app.use('/match', matchingRouter);
app.use('/login', loginRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res,) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(function(){
    console.log("Server is running..");
});

module.exports = app;
