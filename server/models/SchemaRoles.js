const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {Company} = require('./SchemaCompany');
const {Usuario} = require('./SchemaUsuarios')
const uniqueValidator = require('mongoose-unique-validator');

const RolesDB = new Schema({
    nombre:{
        type: String,
        require: true,
        lowercase: true,
        trim: true
    },
    permisos:{
        type: Array,
    },
    fecha: {type:Date, default:Date.now},
    estado:{type: Boolean, default: true},
    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        require: true
    },
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        require: true
    }
});


RolesDB.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
const Permisos = mongoose.model('Permisos', RolesDB);

module.exports ={
    Permisos
}