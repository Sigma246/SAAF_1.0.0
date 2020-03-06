const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {Empresa} = require('./SchemaEmpresa');
const {Company} = require('./SchemaCompany');
const uniqueValidator = require('mongoose-unique-validator');

const Childs = new Schema();

Childs.add({
    name: {
        type: String,
    },
    fecha: {type:Date, default:Date.now},
    estado:{type: Boolean, default: true},
    children  : [Childs]
});


const UbicacionDB = new Schema({
   
    children: [Childs],
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
    },
    empresa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Empresa"
    },
    fecha: {type:Date, default:Date.now},
    estado:{type: Boolean, default: true},
    
});


UbicacionDB.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
const Ubicacion = mongoose.model('Ubicacion', UbicacionDB);

module.exports ={
    Ubicacion,
    
}