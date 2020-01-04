const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {Empresa} = require('./SchemaEmpresa');
const {Company} = require('./SchemaCompany');
const uniqueValidator = require('mongoose-unique-validator');

const CentrodecostosDB = new Schema({
    clave: {
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
    descripcion:{
        type: String,
        trim: true,
    },
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
})

CentrodecostosDB.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
const centrodecostos = mongoose.model('centrodecostos', CentrodecostosDB);

module.exports ={
    centrodecostos
}