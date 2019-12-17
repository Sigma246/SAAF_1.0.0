const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {Empresa} = require('../models/SchemaEmpresa');
const {Permisos} = require('../models/SchemaRoles');
const {Usuarios} = require('../models/SchemaUsuarios');
const {Tdc} = require('../models/SchemaTdc');
const {inpc} = require('./SchemaInpc');
const uniqueValidator = require('mongoose-unique-validator');

const CompanyDB = new Schema({
    nombre:{
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        unique: true, 
    },
    nombre_corto:{
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        
    },
    fecha: {type:Date, default:Date.now},
    estado:{
        type: Boolean,
        default: true
    },
    empresa:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Empresa",
        require: true,
        excludeIndexes: true
    }],
    usuarios:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Usuarios",
        require: true,
        excludeIndexes: true
    }],
    permisos:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Permisos",
        require: true,
    }],
    tdc:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Tdc",
        require: true,
        excludeIndexes: true
    }],
    inpc:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "inpc",
        require: true,
    }]
});

CompanyDB.plugin(uniqueValidator, { message: '{PATH} debe de ser único' })
const Company = mongoose.model('Company', CompanyDB);

module.exports ={
    Company,
    CompanyDB
}