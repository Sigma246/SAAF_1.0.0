const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {Empresa} = require('./SchemaEmpresa');
const {Company} = require('./SchemaCompany');
const uniqueValidator = require('mongoose-unique-validator');

const ProyectosDB = new Schema({
    clave:{
        type: String,
        require: true,
        trim: true,
    },
    nombre:{
        type: String,
        require: true,
        lowercase: true,
        trim: true,
    },
    importe:{
        type: Number,
        require: true,
        lowercase: true,
        trim: true,
    },
    empresa:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Empresa",
        require: true
    },
    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        require: true
    },
    fecha: {type:Date, default:Date.now},
    estado:{type: Boolean, default: true},
});


ProyectosDB.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
const Proyectos = mongoose.model('Proyectos', ProyectosDB);

module.exports ={
    Proyectos
}