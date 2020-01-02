const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {Empresa} = require('./SchemaEmpresa');
const {Company} = require('./SchemaCompany');
const uniqueValidator = require('mongoose-unique-validator');


const UbicacionDB = new Schema({
    nombre: {
        type: String,
        required: true
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ubicacion"
    },
    childs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ubicacion"
    }],
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
    },
    subcompany: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Empresa"
    },
    fecha: {type:Date, default:Date.now},
    estado:{type: Boolean, default: true},
    
});


UbicacionDB.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
const Ubicacion = mongoose.model('Ubicacion', UbicacionDB);

module.exports ={
    Ubicacion
}