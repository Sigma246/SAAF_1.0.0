const express = require('express');
const router = express.Router();
const {activos} = require('../models/SchemaActivos');
const { check, validationResult } = require('express-validator');
const fs = require('fs');
const qr = require('qr-image');
const bwipjs = require('bwip-js');

    

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

    let  base64data;
        fs.readFile('server/files/_love_bar.png', function(err, data) {
             base64data = new Buffer(data).toString('base64');
            console.log(base64data);
         });

    barcode = await bwipAsync(options);
    console.log(barcode);
    try {
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
                data: base64data,
            },
            qrcode: "",
            company,
            empresa
        });
           
        
         let activo = await activosdb.save();
       /*  qrcode = qr.imageSync(`${activo._id}`, { type: 'png' });
        console.log("holaaa")
        console.log(qrcode);
        */// let activocode = await activos.updateMany({_id: activo._id},{$set:{'qrcode': base64data}});
         
        res.json({
            ok: true,
            activo
        });

    } catch (e) {
        res.status(500).json(e);
    }

});


router.get('/imagen',async(req, res)=>{

    let body = req.body;
    let company = req.params.idcompany;
    let empresa = req.params.idempresa;
    let image = req.params.idimage;

    try {
        
      

    } catch (e) {
        res.status(500).json(e);    
    }
});


module.exports = router;