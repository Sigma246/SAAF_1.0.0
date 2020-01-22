const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {Empresa} = require('./SchemaEmpresa');
const {Company} = require('./SchemaCompany');
const {Catalogo} = require('../models/SchemaCatalogos');
const {empleados} = require('../models/SchemaEmpleados');
const {ubicacion} = require('../models/SchemaUbicacion');
const {Proveedores} = require('../models/SchemaProveedores');
const {centrodecostos} = require('../models/SchemaCentrodecostos');
const {cuentascontables} = require('../models/SchemaCuentasContables');
const {tiposactivo} = require('../models/SchemaTimposActivo');
const {Depreciacion} = require('../models/SchemaDepreciacion');
const {Proyectos} = require('../models/SchemaProyectos');
const {files} = require('../models/SchemaArchivos');
const uniqueValidator = require('mongoose-unique-validator');


const UsuarioDB = new Schema({
    _id: { 
        type: Schema.ObjectId,
        required: false
    },
    datos:{
        nombre: { 
            type: String, 
            required: false,
            trim: true,
            lowercase: true, 
        },
        apellido: { 
            type: String, 
            required: false,
            trim: true,
            lowercase: true, 
        },
        email: { 
            type: String,
            required: false,
            trim: true,
            lowercase: true, 
        }
    },
});

const NotasDB = new Schema({
    creadopor: UsuarioDB,
    text: { 
        type: String,
        required: true
    },
    estado: { type: Boolean, default: true },
    fecha: {type:Date, default:Date.now},
},{ 
    timestamps: true
});


const ActivosDB = new Schema({
    numero: {
        type: String, 
        required: false,
        trim: true,
        lowercase: true,
    },
    numeroserie: {
        type: String, 
        required: false,
        trim: true,
        lowercase: true,
    },
    nombre: {
        type: String, 
        required: false,
        trim: true,
    },
    modelo: {
        type: String, 
        required: false,
        trim: true,
        lowercase: true,
    },
    marca: {
        type: String, 
        required: false,
        trim: true,
        lowercase: true,
    },
    estadofisico: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Catalogo",
    },
    fechacompra: {type:Date},
    pais: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Catalogo",
    },
    text : {
        type: String,
        trim: true,
    },
    reponsable:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "empleados",
    },
    ubicacion: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "ubicacion",
    },
    proveedor: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Proveedores",
    },
    precio: {
        type: Number,
        trim: true,
    },
    moneda: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Catalogo",
    },
    tipodecambio: {
        type: Number,
        trim: true,
    },
    condicioncompra: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Catalogo",
    },
    centrodecostos: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "centrodecostos",
    },
    cuentacontable: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "cuentascontables",
    },
    tipoactivo: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "tiposactivo",
    },
    fechaaplicacion: {type:Date},
    estatus: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Catalogo",
    },
    depreciacionfinanciera: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Depreciacion",
    },
    depreciacionfiscal: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Depreciacion",
    },
    proyecto: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Proyectos",
    },
    costoproyecto: {
        type: Number,
        trim: true,
    },
    ordencompra: {
        type: String,
        trim: true,
    },
    asegurable: { type: Boolean, default: false },
    aseguradora: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Catalogo",
    },
    polizaseguro: {
        type: String,
        trim: true,
    },
    porcentajeasegurado: {
        type: Number,
        trim: true,
    },
    numerofactura: {
        type: String,
        trim: true,
    },
    foliofactura:{
        type: String,
        trim: true,
    },
    conceptofactura: {
        type: String,
        trim: true,
    },
    notas: [NotasDB],
    files: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "files",
    }],
    estado: {
        type: Boolean,
        default: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    pendingchanges: {
        type: Boolean,
        default: false
    },
    qrurl: { type: String },
    barurl: { type: String }
},{ 
    strict: false,
    timestamps: true 
});


ActivosDB.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
const activos = mongoose.model('activos', ActivosDB);

module.exports ={
    activos
}