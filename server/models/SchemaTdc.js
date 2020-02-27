const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {Company} = require('./SchemaCompany');
const uniqueValidator = require('mongoose-unique-validator');

const TdcDB = new Schema({
    moneda_origen:{
        type: String,
        require: true,
        lowercase: true,
        trim: true,
    },
    moneda_destino:{
        type: String,
        require: true,
        lowercase: true,
        trim: true,
    },
    valor:{
        type: Number,
        require: true,
        trim: true,
    },
    estado:{type: Boolean, default: true},
    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        require: true
    }
},{timestamps: true });


TdcDB.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
const Tdc = mongoose.model('Tdc', TdcDB);

module.exports ={
    Tdc
}