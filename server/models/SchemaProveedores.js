const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {Empresa} = require('./SchemaEmpresa');
const uniqueValidator = require('mongoose-unique-validator');

const ProveedoresDB =  new Schema({
    clave:{
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    nombre:{
        type: String,
        require: true,
        lowercase: true,
        trim: true,
    },
    email:{
        type: String,
        require: true,
        lowercase: true,
        trim: true,
    },
    telefono:{
        type: Number,
        require: true,
        lowercase: true,
        trim: true,
    },
    rfc:{
        type: String,
        lowercase: true,
        trim: true,
    },
    empresa:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Empresa",
        require: true
    },
    fecha: {type:Date, default:Date.now},
    estado:{type: Boolean, default: true},
});


ProveedoresDB.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
const Proveedores = mongoose.model('Proveedores', ProveedoresDB);

module.exports ={
    Proveedores
}