const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {Empresa} = require('./SchemaEmpresa');
const {Company} = require('./SchemaCompany');
const {Ubicacion} = require('./SchemaUbicacion');
const {centrodecostos} = require('./SchemaCentrodecostos');
const uniqueValidator = require('mongoose-unique-validator');



const CaposExtra = new Schema({
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
    valor:{
        type: String,
        require: true,
        lowercase: true,
        trim: true,
    },
    fecha: {type:Date, default:Date.now},
    estado:{type: Boolean, default: true},
});


const EmpleadoDB = new Schema({
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
    apellido:{
        type: String,
        require: true,
        lowercase: true,
        trim: true,
    },
    puesto:{
        type: String,
        require: true,
        lowercase: true,
        trim: true,
    },
    empresa: {
        type: Schema.Types.ObjectId,
        ref: "Empresa"
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: "Company"
    },
    ubicacion:{
        type: Schema.Types.ObjectId,
        ref: "Ubicacion"
    },
    centrodecostos:{
        type: Schema.Types.ObjectId,
        ref: "centrodecostos"
    },
    departamento:{
        type: String,
        require: true,
        lowercase: true,
        trim: true,
    },
    jefedirecto:{
        type: String,
        require: true,
        lowercase: true,
        trim: true,
    },
    email:{
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    extencion:{
        type: Number,
        trim: true,
    },
    extra: [CaposExtra],
    fechain: {type:Date},
    estado: {type: Boolean, default: true}
});


EmpleadoDB.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
const Empleados = mongoose.model('Empleados', EmpleadoDB);

module.exports ={
    Empleados
}