const express = require('express');
const app = express();

app.use('/login', require('./login'));
app.use('/usuarios', require('./usuarios'));
app.use('/company', require('./company'));
app.use('/empresa', require('./empresa'));
app.use('/permisos', require('./roles'));
app.use('/tiposdecambio', require('./tiposdecambio'));
app.use('/inpc', require('./inpc'));

module.exports = app;