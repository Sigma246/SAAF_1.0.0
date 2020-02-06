const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const FileDB = new Schema({
    nombre: { 
        type: String, 
        required: true 
    },
    /* originalnombre: { 
        type: String, 
        required: true 
    }, */
    url: { 
        type: String,
        required: true 
    },
    default: { 
        type: Boolean, 
        required: true, 
        default: true
    }
});
  


FileDB.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
const files = mongoose.model('files', FileDB);

module.exports ={
    files
}