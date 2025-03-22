require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);

var indexRouter = require('./routes/index');
var loginUserRouter = require('./routes/login.user');
var authUserRouter = require('./routes/auth.user');
var churchesRouter = require('./routes/churches');
var revenuesRouter = require('./routes/revenues');
var usersRouter = require('./routes/users');

var { sequelize } = require('./models'); // Importa a conexão e os modelos
const { initCronManager } = require('./cronjobs/cronjobs');


var app = express();

initCronManager();

// config session ===============================================
app.use(session({
    store: new SQLiteStore({ db: 'sessions.sqlite', dir: './databases' }),
    secret: 'chave-secreta', // Altere para uma chave segura
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 } // 1 dia de sessão
}));

// Inicializar o banco de dados e sincronizar modelos ==========
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

// view engine setup ==============================================
app.set('views', path.join(__dirname, 'src/modules'));

app.set('view engine', 'ejs');

// config =========================================================
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes =========================================================
app.use('', indexRouter);
app.use('', loginUserRouter);
app.use('', authUserRouter);
app.use('', churchesRouter);
app.use('', revenuesRouter);
app.use('', usersRouter)

// catch 404 and forward to error handler =========================
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler ==================================================
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
