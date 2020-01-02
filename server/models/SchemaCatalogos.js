const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {Empresa} = require('./SchemaEmpresa');
const {Company} = require('./SchemaCompany');
const uniqueValidator = require('mongoose-unique-validator');

const ElementoDB = new Schema({
    clave: {
        type: String,
        require: true,
        trim: true,
    },
    valor: {
        type: String,
        require: true,
        lowercase: true,
        trim: true,
    },
    fecha: {type:Date, default:Date.now},
    estado:{type: Boolean, default: true},
  });
  
const CatalogoDB = new Schema({
    nombre: {
        type: String,
        require: true,
        lowercase: true,
        trim: true,
    },
    clave: {
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
    elementos: [ElementoDB],
    fecha: {type:Date, default:Date.now},
    estado:{type: Boolean, default: true},
});


CatalogoDB.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
const Catalogo = mongoose.model('Catalogo', CatalogoDB);

module.exports ={
    Catalogo
}