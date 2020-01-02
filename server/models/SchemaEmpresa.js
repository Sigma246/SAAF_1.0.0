const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const {Company} = require('../models/SchemaCompany');
const {Proyectos} = require('./SchemaProyectos');
const {Proveedores} = require('./SchemaProveedores');

const EmpresaDB = new Schema({
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
    company:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        require: true
    },
   /*  proveedor:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Proveedores",
        require: true,
    }],
    proyectos:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Proyectos",
        require: true,
    }], */
});

EmpresaDB.plugin(uniqueValidator, { message: '{PATH} debe de ser único' })
const Empresa = mongoose.model('Empresa', EmpresaDB);

module.exports ={
    Empresa,
    EmpresaDB
}