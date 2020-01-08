const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {Empresa} = require('./SchemaEmpresa');
const {Company} = require('./SchemaCompany');
const uniqueValidator = require('mongoose-unique-validator');


const RangoDB = new Schema({
    valor: {
        type: [Number],
        require: true,
        trim: true,
    },
    fecha: {type:Date, default:Date.now},
  });



const DepreciacionDB = new Schema({

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
    criterio:{
        type: String,
        require: true,
        enum : ['Fecha de aplicación', 'Mes siguiente', " "],
        default: 'Fecha de aplicación'
    },
    maximocatidad:{
        type: Number,
        trim: true,
        default: 0,
    },
    maximoporcentaje:{
        type:  Number,
        trim: true,
        default: 0,
    },
    rangos:[RangoDB],
    meses:{
        type: Number,
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

DepreciacionDB.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
const Depreciacion = mongoose.model('Depreciacion', DepreciacionDB);

module.exports ={
    Depreciacion
}