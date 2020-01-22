const express = require('express');
const router = express.Router();
const {activos} = require('../models/SchemaActivos');
const { check, validationResult } = require('express-validator');
var qr = require('qr-image');



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
        var qr_svg = qr.image('I love QR!', { type: 'svg' });
        qr_svg.pipe(require('fs').createWriteStream('i_love_qr.svg'));
 
        var svg_string = qr.imageSync('I love QR!', { type: 'svg' });
        res.json({
            ok: true,
           // activo
           svg_string
        });
    } catch (e) {
        res.status(500).json(e);
    }

});

module.exports = router;