const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {Company} = require('../models/SchemaCompany');
const {Permisos} = require('./SchemaRoles');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');

const UsuariosDB = new Schema({
    nombre: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,
    
    },
    apellido:{
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        
    },
    email:{
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    fecha: {type:Date, default:Date.now},
    password:{
        type: String,
        require: true,
        trim: true,
    },
    estado:{
        type: Boolean,
        default: true
    },
    company:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Company",
        require: true,
        excludeIndexes: true
    }],
    permisos:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Permisos",
        require: true,
        excludeIndexes: true
    }],
    
});


UsuariosDB.methods.toJSON = function(){

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
};

UsuariosDB.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

UsuariosDB.methods.loginJWT = function(){
    return jwt.sign({ 
        _id: this.id,
        nombre: this.nombre,
        apellido: this.apellido,
        email: this.email,
        permisos: this.permisos,
        company: this.company
    },process.env.NODE_FIRM_SAaf);
};

UsuariosDB.methods.tokenJWT = function(){
    return jwt.sign({
        usuario: this.company
    },process.env.NODE_FIRM_data);
};

UsuariosDB.index({
    'nombre':1,
    'apellido':1,
    'email':1
})

const Usuario = mongoose.model('Usuarios', UsuariosDB);

module.exports ={
    Usuario,
    UsuariosDB
}