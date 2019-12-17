require('./config/server');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// ============================
//  Uso de bodyParser
// ============================
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// ============================
//  Alta de rutas
// ============================
app.use(require('./routers/index'));

  
// ============================
//  Conexion a mongodb
// ============================
mongoose.connect(process.env.URLDB,{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false })
    .then(()=> console.log('Conectado a MongoDb'))
    .catch(erro => console.log('No se ha conectado a MongoDb'))


// ============================
//  Asignacion de puerto
// ============================
app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto ${process.env.PORT}`)
});