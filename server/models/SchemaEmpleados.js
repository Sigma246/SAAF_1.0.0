const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {Empresa} = require('./SchemaEmpresa');
const {Company} = require('./SchemaCompany');
const uniqueValidator = require('mongoose-unique-validator');

const EmpleadosDB = new Schema({

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