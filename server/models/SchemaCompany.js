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
    role_list:{},
    estado:{
        type: Boolean,
        default: true
    },
},{timestamps: true});

CompanyDB.plugin(uniqueValidator, { message: '{PATH} debe de ser único' })
const Company = mongoose.model('Company', CompanyDB);

module.exports ={
    Company,
    CompanyDB
}