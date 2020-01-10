const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {Empresa} = require('./SchemaEmpresa');
const {Company} = require('./SchemaCompany');
const {cuentascontables} = require('../models/SchemaCuentasContables')
const uniqueValidator = require('mongoose-unique-validator');

const ElementoDB = new Schema({
    clave: {
        type: String,
        require: true,
        trim: true,
    },
    valor: {
        type: String,
        require: true,
        lowercase: true,
        trim: true,
    },
    fecha: {type:Date, default:Date.now},
    estado:{type: Boolean, default: true},
});

const TiposActivoDB = new Schema({

    clave:{
        type: String,
        require: true,
        trim: true,
    },
    nombre:{
        type: String,
        require: true,
        trim: true,
        lowercase: true,
    },
    cuentacontable:{
        type: Schema.Types.ObjectId,
        ref: "cuentascontables"
    },
    descripcion:{
        type: String,
        trim: true,
        lowercase: true,
    },
    deprefinanciera:{
        type: Schema.Types.ObjectId,
        ref: "Depreciacion"
    },
    deprefiscal:{
        type: Schema.Types.ObjectId,
        ref: "Depreciacion"
    },
    elementos: [ElementoDB],
    company: {
        type: Schema.Types.ObjectId,
        ref: "Company"
    },
    empresa: {
        type: Schema.Types.ObjectId,
        ref: "Empresa"
    },
    fecha: {type:Date, default:Date.now},
    estado:{type: Boolean, default: true},

});

TiposActivoDB.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
const tiposactivo = mongoose.model('tiposactivo', TiposActivoDB);

module.exports ={
    tiposactivo
}