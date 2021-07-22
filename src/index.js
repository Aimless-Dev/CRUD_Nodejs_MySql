const express = require("express"), path = require('path'), morgan = require('morgan'), mysql = require('mysql'), myConnection = require('express-myconnection');
const app = express();
// importando rutas
const customerRutes = require('./routes/customer')

// Configuraion de express
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'crudnodejs'
}, 'single'));

app.use(express.urlencoded({extended: false}));

// rutas
app.use('/', customerRutes);


// archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

// Iniciando servidor
app.listen(app.get('port'), () => {
    console.log("Server funcionando en el puerto " + app.get('port'));
})