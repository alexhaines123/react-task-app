const createError = require('http-errors'),
  express = require('express'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan'),
  mysql = require('mysql2'),
  indexRouter = require('./routes/index'),
  fs = require( 'fs' ),
  bodyParser = require('body-parser'),
  MySqlSync = require('sync-mysql');

let cors = require('cors');

const dbConnectionData = {
    host: 'localhost',
    user:'root',
    password:'<Change Password here>'
};

// Syncronous function to be used if no database already
const initConnection = new MySqlSync({ ...dbConnectionData, multipleStatements : true });
let connection;
// If database exists then create normal sql connection
if (initConnection.query('SHOW DATABASES LIKE "taskboard";').length > 0) {
  connection = mysql.createConnection({ ...dbConnectionData, database: 'taskboard' });
} else {
  try {
    connection = mysql.createConnection({ ...dbConnectionData, database: 'taskboard' });
    const createDbSql = String( fs.readFileSync( 'createdb.sql' ) );
    initConnection.query( createDbSql);
    connection = mysql.createConnection({ ...dbConnectionData, database: 'taskboard' });
  } catch (e) {
    console.log('Database already created')
  }
}
const app = express();

//CORS
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Use the apis to be used by react
require('./routes/html-routes')(app, connection);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
