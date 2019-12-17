const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {Company} = require('./SchemaCompany');
const uniqueValidator = require('mongoose-unique-validator');

const ValuesSchema = new Schema({
    1: { type: Number, default: 1 },
    2: { type: Number, default: 1 },
    3: { type: Number, default: 1 },
    4: { type: Number, default: 1 },
    5: { type: Number, default: 1 },
    6: { type: Number, default: 1 },
    7: { type: Number, default: 1 },
    8: { type: Number, default: 1 },
    9: { type: Number, default: 1 },
    10: { type: Number, default: 1 },
    11: { type: Number, default: 1 },
    12: { type: Number, default: 1 }
});
  
const InpcSchema = new Schema({
    year: {
        type: Number,
        required: true,
        lowercase: true,
        trim: true,
    },
    meses: {
        type: ValuesSchema,
        required: true,
    },
    fecha: {type:Date, default:Date.now},
    estado: {type: Boolean, default: true},
    company: {
        type: Schema.Types.ObjectId,
        ref: "Company"
    }
});


InpcSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
const inpc = mongoose.model('inpc', InpcSchema);

module.exports ={
    inpc
}


