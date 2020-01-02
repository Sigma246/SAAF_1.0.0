const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {Company} = require('./SchemaCompany');
const uniqueValidator = require('mongoose-unique-validator');

const TdcDB = new Schema({
    moneda_o:{
        type: String,
        require: true,
        lowercase: true,
        trim: true,
    },
    moneda_d:{
        type: String,
        require: true,
        lowercase: true,
        trim: true,
    },
    valor:{
        type: mongoose.Decimal128,
        require: true,
        trim: true,
    },
    fecha: {type:Date, default:Date.now},
    estado:{type: Boolean, default: true},
    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        require: true
    }
});


TdcDB.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
const Tdc = mongoose.model('Tdc', TdcDB);

module.exports ={
    Tdc
}