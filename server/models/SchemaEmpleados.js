const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {Empresa} = require('./SchemaEmpresa');
const {Company} = require('./SchemaCompany');
const uniqueValidator = require('mongoose-unique-validator');

const EmpleadosDB = new Schema({

    clave:{
        type: String,
        require: true,
        trim: true,
    },
    nombre:{
        type: String,
        require: true,
        trim: true,
    },
    apellido:{
        type: String,
        require: true,
        trim: true,
    },
    posicion:{
        type: String,
        require: true,
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

},{ strict: false });

EmpleadosDB.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
const empleados = mongoose.model('empleados', EmpleadosDB);

module.exports ={
    empleados
}