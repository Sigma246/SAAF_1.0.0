const express = require('express');
const router = express.Router();
const {tiposactivo} = require('../models/SchemaTimposActivo');
const { check, validationResult } = require('express-validator');

router.post('/post/:idcompany/:idempresa',[
    check('clave').isLength({ min: 2 }),
    check('nombre').isLength({ min: 2 }),
],async(req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let body = req.body;
    let empresa = req.params.idempresa;
    let company = req.params.idcompany;

    try {
        let TipoActivo = new tiposactivo({
            clave: body.clave,
            nombre: body.nombre,
            descripcion: body.descripcion,
            cuentacontable: body.cuentacontable,
            deprefinanciera: body.deprefinanciera,
            deprefiscal: body.deprefiscal,
            elementos: body.elementos,
            company,
            empresa
        });
        let tipoactivo = await TipoActivo.save();
        res.json({
            ok: true,
            tipoactivo
        })
    } catch (e) {
        res.status(500).json(e);
    }

});


router.put('/put/:idcompany/:idempresa/:idtipoactivo',[
    check('clave').isLength({ min: 2 }),
    check('nombre').isLength({ min: 2 }),
],async(req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let body = req.body;
    let id = req.params.idtipoactivo;
    let empresa = req.params.idempresa;
    let company = req.params.idcompany;

    try {
        let tipoactivo = await tiposactivo.findOneAndUpdate({_id: id, company, empresa},{$set:{
            'clave': body.clave,
            'nombre': body.nombre,
            'descripcion': body.descripcion,
            'estado': body.estado,
            'cuentacontable': body.cuentacontable,
            'deprefinanciera': body.deprefinanciera,
            'deprefiscal': body.deprefiscal
        }});
        res.json({
            ok: true,
            tipoactivo
        })
    } catch (e) {
        res.status(500).json(e);
    }
});

router.put('/put/elementos/:idcompany/:idempresa/:idtipoactivo',async(req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let body = req.body;
    let id = req.params.idtipoactivo;
    let empresa = req.params.idempresa;
    let company = req.params.idcompany;

    try {
        let tipoactivo = await tiposactivo.findOneAndUpdate({_id: id, company, empresa},{$set:{
            elementos: body.elementos,
        }});
        res.json({
            ok: true,
            tipoactivo
        })
    } catch (e) {
        res.status(500).json(e);
    }
});

router.get('/get/:idcompany/:idempresa/:idtipoactivo',async(req, res)=>{
    let id = req.params.idtipoactivo;
    let empresa = req.params.idempresa;
    let company = req.params.idcompany;
    try {
        let tipoactivo = await tiposactivo.find({_id: id, company, empresa}).populate([
            {path: 'cuentacontable', select: 'nombre'},
            {path: 'deprefinanciera', select: 'nombre'},
            {path: 'deprefiscal', select: 'nombre'}
        ]);
        res.json({
            ok: true,
            tipoactivo
        })
    } catch (e) {
        res.status(500).json(e);
    }
});

router.get('/get/:idcompany/:idempresa',async(req, res)=>{
    let empresa = req.params.idempresa;
    let company = req.params.idcompany;
    let search = req.query.search;

    let order_by_clave = req.query.order_by_clave;
    order_by_clave = Number(order_by_clave);

    let order_by_nombre =  req.query.order_by_nombre;
    order_by_nombre = Number(order_by_nombre);

    let order_by_descripcion =  req.query.order_by_descripcion;
    order_by_descripcion = Number(order_by_descripcion);

    let order_by_cuentacontable =  req.query.order_by_cuentacontable;
    order_by_cuentacontable = Number(order_by_cuentacontable);

    let order_by_status =  req.query.order_by_status;
    order_by_status = Number(order_by_status);

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);

    try {
        let tipoactivo = await tiposactivo.find({company, empresa}).or([
            {'clave':{$regex: search}},
            {'nombre':{$regex: search}},
            {'descripcion':{$regex: search}}
        ]).sort({
            'clave': order_by_clave,
            'nombre': order_by_nombre,
            'descripcion': order_by_descripcion,
            'cuentacontable.nombre': order_by_cuentacontable,
            'estado': order_by_status,
        }).skip(desde).limit(limite).populate([
            {path: 'cuentacontable', select: 'nombre'},
            {path: 'deprefinanciera', select: 'nombre'},
            {path: 'deprefiscal', select: 'nombre'}
        ]);
        res.json({
            ok: true,
            tipoactivo
        })
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;