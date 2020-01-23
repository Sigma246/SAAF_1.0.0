const express = require('express');
const router = express.Router();
const {activos} = require('../models/SchemaActivos');
const { check, validationResult } = require('express-validator');
const qr = require('qr-image');
/* 
var fs = require('fs');
var mongoose = require("mongoose");
var Grid = require('gridfs-stream');
//var db = new mongo.Db('MongoDB', new mongo.Server(mongoose));

//var gfs = Grid(mongoose.connection.db, mongoose.mongo); 
var gfs = Grid(db, mongoose);
 */

router.post('/post/:idcompany/:idempresa',[
    check('nombre').isLength({ min: 2 }),
],async(req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let body = req.body;
    let company = req.params.idcompany;
    let empresa = req.params.idempresa;

    try {
        let activosdb = new activos({
            numero: body.nombre,
            numeroserie: body.numeroserie,
            nombre: body.nombre,
            modelo: body.modelo,
            marca: body.marca,
            estadofisico: body.estadofisico,
            fechacompra: body.fechacompra,
            pais: body.pais,
            text: body.text,
            notas: body.notas,
            company,
            empresa
        });
        
        //let activo = await activosdb.save();

       
        // streaming to gridfs
        var writestream = gfs.createWriteStream({
            filename: 'my_file.txt'
        });
        fs.createReadStream('/some/path').pipe(writestream);
         
        // streaming from gridfs
        var readstream = gfs.createReadStream({
          filename: 'my_file.txt'
        });
         
        //error handling, e.g. file does not exist
        /* readstream.on('error', function (err) {
          console.log('An error occurred!', err);
          throw err;
        });
         
        readstream.pipe(response);
 */

       /*  var qr_png = qr.image('I love QR!', { type: 'png' });
        qr_png.pipe(require('fs').createWriteStream('i_love_qr.png'));
 
        var png_string = qr.imageSync('I love QR!', { type: 'png' }); */
        
        res.json({
            ok: true,
           // activo
           //file
        });
    

    } catch (e) {
        res.status(500).json(e);
    }

});

module.exports = router;