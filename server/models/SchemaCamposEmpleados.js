const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {Empresa} = require('./SchemaEmpresa');
const {Company} = require('./SchemaCompany');
const uniqueValidator = require('mongoose-unique-validator');


const CamEmpleados = new Schema({

    campos:[{
        valor:{
            type: String,
            require: true,
            lowercase: true,
            trim: true,
        },
        rol:{
            type: String,
            require: true,
            lowercase: true,
            trim: true,
            default: 'amdin',
        },
        nombre_campo:{
            type: String,
            require: true,
            lowercase: true,
            trim: true,
        },
        estado:{type: Boolean, default: true},
    }],
    company: {
        type: Schema.Types.ObjectId,
        ref: "Company"
    },
    empresa: {
        type: Schema.Types.ObjectId,
        ref: "Empresa"
    },
    
},{timestamps: true});

CamEmpleados.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
const camempleados = mongoose.model('camempleados', CamEmpleados);

module.exports ={
    camempleados
}