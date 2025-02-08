var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var loginUserRouter = require('./routes/login.user');
var authUserRouter = require('./routes/auth.user');
var churchesRouter = require('./routes/churches');
const revenuesRouter = require('./routes/revenues');

var { sequelize } = require('./models'); // Importa a conexão e os modelos


var app = express();


// Inicializar o banco de dados e sincronizar modelos
sequelize.authenticate()
    .then(() => {
        console.log('Conectado ao banco de dados.');
        return sequelize.sync(); // Cria as tabelas caso ainda não existam
    })
    .then(() => {
        console.log('Tabelas sincronizadas.');
    })
    .catch(err => {
        console.error('Erro ao conectar ao banco de dados:', err);
    });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('', indexRouter);
app.use('', loginUserRouter);
app.use('', authUserRouter);
app.use('', churchesRouter);
app.use('', revenuesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
