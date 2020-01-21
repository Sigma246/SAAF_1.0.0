const express = require('express');
const router = express.Router();
const {camempleados} = require('../models/SchemaCamposEmpleados');
const { check, validationResult } = require('express-validator');

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
        let campo_empleado = new camempleados({
            nombre: body.nombre,
            company,
            empresa
        });
        let campoempleado = await campo_empleado.save();
        res.json({
            ok: true,
            campoempleado
        });
    } catch (e) {
        res.status(500).json(e);
    }

});

router.put('/post/:idcompany/:idempresa/:idcampo',[
    check('nombre').isLength({ min: 2 }),
],async(req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let body = req.body;
    let id = req.params.idcampo;
    let company = req.params.idcompany;
    let empresa = req.params.idempresa;
    
    try {

        let campoempleado = await camempleados.findByIdAndUpdate({_id: id, company, empresa},{$set:{'nombre':body.nombre,'estado':body.estado}});
        res.json({
            ok: true,
            campoempleado
        });
    } catch (e) {
        res.status(500).json(e);
    }
});

router.get('/post/:idcompany/:idempresa/:idcampo',async(req, res)=>{
    
    let id = req.params.idcampo;
    let company = req.params.idcompany;
    let empresa = req.params.idempresa;

    try {
        let campoempleado = await camempleados.find({_id: id, company, empresa});
        res.json({
            ok: true,
            campoempleado
        });
    } catch (e) {
        res.status(500).json(e);
    }
});


router.get('/post/:idcompany/:idempresa',async(req, res)=>{
    
    let company = req.params.idcompany;
    let empresa = req.params.idempresa;
    let search = req.query.search;

    let order_by_name = req.query.order_by_nombre;
    order_by_name = Number(order_by_name);

    let order_by_status =  req.query.order_by_estado;
    order_by_status = Number(order_by_status);

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);  

    try {
        let campoempleado = await camempleados.find({company, empresa}).or([
            {'nombre':{$regex: search}}
        ]).sort({
            'nombre': order_by_name,
            'estado': order_by_status,
        }).skip(desde).limit(limite);

        let tota_document = await camempleados.count({company, empresa});

        res.json({
            ok: true,
            campoempleado,
            tota_document
        });
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;