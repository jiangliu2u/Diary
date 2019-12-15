const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const index = require('./routes/index');
const users = require('./routes/users');
const reg = require('./routes/reg');
const login = require('./routes/login');
const login_api = require('./routes/login_api');
const logout = require('./routes/logout');
const api = require('./routes/api');//restful api 以便angular访问
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'jiangliu',
    cookie: {
        maxAge: 15 * 60*1000,//会话状态保持15min
    },
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    resave: true,
    saveUninitialized: true
}));
app.use('/', index);
app.use('/users', users);
app.use('/reg', reg);
app.use('/login', login);
app.use('/login_api', login_api);
app.use('/logout', logout);
app.use('/api', api);


app.use(function (req, res, next) {
    console.log("app.usr local");
    res.locals.user = req.session.user;
    res.locals.post = req.session.post;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
