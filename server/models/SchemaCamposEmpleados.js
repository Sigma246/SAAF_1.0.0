const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {Empresa} = require('./SchemaEmpresa');
const {Company} = require('./SchemaCompany');
const uniqueValidator = require('mongoose-unique-validator');


const CamEmpleados = new Schema({

    nombre:{
        type: String,
        require: true,
        lowercase: true,
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

});

CamEmpleados.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
const camempleados = mongoose.model('camempleados', CamEmpleados);

module.exports ={
    camempleados
}