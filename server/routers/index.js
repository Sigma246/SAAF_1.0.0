const express = require('express');
const app = express();

app.use('/login', require('./login'));
app.use('/usuarios', require('./usuarios'));
app.use('/company', require('./company'));
app.use('/empresa', require('./empresa'));
app.use('/permisos', require('./roles'));
app.use('/tiposdecambio', require('./tiposdecambio'));
app.use('/inpc', require('./inpc'));
app.use('/proveedor', require('./proveedor'));
app.use('/proyecto', require('./proyecto'));
app.use('/catalogo', require('./catalogo'));
app.use('/ubicacion', require('./ubicacion'));
app.use('/centrodecostos', require('./centrodecostos'));
app.use('/depreciacion', require('./depreciacion'));

module.exports = app;