const express = require('express');
const router = express.Router();
const {activos} = require('../models/SchemaActivos');
const { check, validationResult } = require('express-validator');
const fs = require('fs');
const qr = require('qr-image');
const bwipjs = require('bwip-js');

//router.use(fileUpload());

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
    let barcode = body.numero;
    let qrcode;
    let samplefile = req.files.archivo;
    
    let options = ({
        bcid:        'code128',       // Barcode type
        text:        `${barcode}`,    // Text to encode
        scale:       3,               // 3x scaling factor
        height:      10,              // Bar height, in millimeters
        includetext: true,            // Show human-readable text
        textxalign:  'center',        // Always good to set this
    })
    
    function bwipAsync(options) {
        return new Promise((resolve, reject) => {
            bwipjs.toBuffer(options, (err, png) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(png);
                }
            });
        });
    }

    barcode = await bwipAsync(options);
    barcode = new Buffer(barcode).toString('base64');

    try {

        samplefile.mv('server/files/', (e)=>{
            if (e)
            return res.status(500).json(e);
        });

        let activosdb = new activos({
            numero: body.numero,
            numeroserie: body.numeroserie,
            nombre: body.nombre,
            modelo: body.modelo,
            marca: body.marca,
            precio: body.precio,
            estadofisico: body.estadofisico,
            fechacompra: body.fechacompra,
            pais: body.pais,
            text: body.text,
            notas: body.notas,
            barcode: {
                data: barcode,
                contentType:"image/png"
            },
            qrcode:{
                data: qrcode,
                contentType:"image/png"
            },
            company,
            empresa
        });
        
        //let activo = await activosdb.save();
        
        qrcode = qr.imageSync(`http://localhost:3000/activos/put/${company}/${empresa}/${activo._id}`, { type: 'png' });
        qrcode = new Buffer(qrcode).toString('base64');

        //let activocode = await activos.updateOne({_id: activo._id},{$set:{'qrcode.data': qrcode}});
         
        res.json({
            ok: true,
            activo
        });

    } catch (e) {
        res.status(500).json(e);
    }

});


router.get('/get/imagen/:idimage',async(req, res)=>{

    let body = req.body;
    let company = req.params.idcompany;
    let empresa = req.params.idempresa;
    let image = req.params.idimage;

    try {
        
      let activo = await activos.find({_id:image});
      
        res.json({
            ok: true,
            activo
        });

        console.log(activo[0].qrcode);


    } catch (e) {
        res.status(500).json(e);    
    }
});


module.exports = router;