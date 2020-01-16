const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {Empresa} = require('./SchemaEmpresa');
const {Company} = require('./SchemaCompany');
const uniqueValidator = require('mongoose-unique-validator');

const ProveedoresDB =  new Schema({
    datos:{
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
        email:{
            type: String,
            require: true,
            lowercase: true,
            trim: true,
        },
        telefono:{
            type: Number,
            require: true,
            lowercase: true,
            trim: true,
        },
        rfc:{
            type: String,
            lowercase: true,
            trim: true,
        },
        fecha: {type:Date, default:Date.now},
        estado:{type: Boolean, default: true},
    },
    empresa:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Empresa",
        require: true
    },
    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        require: true
    }
});


ProveedoresDB.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
const Proveedores = mongoose.model('Proveedores', ProveedoresDB);

module.exports ={
    Proveedores
}