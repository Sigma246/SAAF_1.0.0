const express = require('express');
const router = express.Router();
const {files} = require('../models/SchemaArchivos');
const { check, validationResult } = require('express-validator');
var multer  = require('multer');
var upload = multer({ dest: 'server/files/' });
var fs = require('fs');
var path = require('path');

var storage = multer.diskStorage({
    destination:function(req,file,cb){
    cb(null,'public/fotos/')
    },
    filename:function(req,file,cb){
    cb(null,Date.now()+path.extname(file.originalname)); //Appending extension
    }
});

var upload = multer({ storage: storage,
     fileFilter: function (req, file, cb) {
     if (!file.originalname.match(/\.(pdf|png|doc|docx|jpg)$/)) {
        return cb(new Error('Error en el tipo de archivo.'));
     }
        cb(null, true);
     }
});


router.post('/post/:idcompany/:idempresa',upload.array('foto', 2),async(req, res, next)=>{

    let body = req.body;
    let company = req.params.idcompany;
    let empresa = req.params.idempresa;  

    try {

        for(var x=0;x<req.files.length;x++) {
            //copiamos el archivo a la carpeta definitiva de fotos
          // fs.createReadStream('server/files/'+req.files[x].filename).pipe(fs.createWriteStream('./public/fotos/'+req.files[x].originalname, function(error){}));
           //borramos el archivo temporal creado
          // fs.unlink('server/files/'+req.files[x].filename, function(error){});
            
           let archivos = new files({
                nombre: req.files[x].filename,
                originalnombre: req.files[x].originalname,
                url:`https://murmuring-journey-73788.herokuapp.com/server/files/${req.files[x].filename}`,
                empresa,
                company
            });

            let imagenes = await archivos.save();
        
        }
        res.json({
            ok: true,
            message: 'imagenes guardadas'
        });
    } catch (e) {
        res.status(500).json(e);
    }
});


router.get('/verfotos', function(req, res, next) {
    fs.readdir('server/files/', function(err, files) {  
       var pagina='<!doctype html><html><head></head><body>';
       for(var x=0;x<files.length;x++) {
           pagina+='<img src="fotos/'+files[x]+'"><br>';
       }
       pagina+='<br><a href="/">Retornar</a></body></html>';
       res.send(pagina);        
    });
 });


module.exports = router;