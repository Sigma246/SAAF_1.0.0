const express = require('express');
const router = express.Router();
const {cuentascontables} = require('../models/SchemaCuentasContables');
const { check, validationResult } = require('express-validator');

router.post('/post/:idcompany/:idempresa',[
    check('datos.clave').isLength({ min: 2 }),
    check('datos.nombre').isLength({ min: 2 }),
],async(req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let body = req.body;
    let empresa = req.params.idempresa;
    let company = req.params.idcompany;

    try {
        let CuentasContables = new cuentascontables({
            datos:{
                clave: body.datos.clave,
                nombre: body.datos.nombre,
                descripcion: body.datos.descripcion,
                deprefinanciera: body.datos.deprefinanciera,
                deprefiscal: body.datos.deprefiscal,
            },
            elementos: body.elementos,
            company,
            empresa
        });
        let cuentacontable = await CuentasContables.save();
        res.json({
            ok: true,
            cuentacontable
        })
    } catch (e) {
        res.status(500).json(e);
    }

});

router.put('/put/:idcompany/:idempresa/:idcuenta',[
    check('datos.clave').isLength({ min: 2 }),
    check('datos.nombre').isLength({ min: 2 }),
],async(req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let body = req.body;
    let id = req.params.idcuenta;
    let empresa = req.params.idempresa;
    let company = req.params.idcompany;

    try {
        let cuentacontable = await cuentascontables.findOneAndUpdate({_id: id, company, empresa},{$set:{
            'datos.clave': body.datos.clave,
            'datos.nombre': body.datos.nombre,
            'datos.descripcion': body.datos.descripcion,
            'datos.deprefinanciera': body.datos.deprefinanciera,
            'datos.deprefiscal': body.datos.deprefiscal,
            'datos.estado': body.datos.estado
        }});
        res.json({
            ok: true,
            cuentacontable
        })
    } catch (e) {
        res.status(500).json(e);
    }
});

router.put('/put/elemento/:idcompany/:idempresa/:idcuenta',async(req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let body = req.body;
    let id = req.params.idcuenta;
    let empresa = req.params.idempresa;
    let company = req.params.idcompany;

    try {
        let cuentacontable = await cuentascontables.findOneAndUpdate({_id: id, company, empresa},{$set:{
            elementos: body.elementos,
        }});
        res.json({
            ok: true,
            cuentacontable
        })
    } catch (e) {
        res.status(500).json(e);
    }
});

router.get('/get/:idcompany/:idempresa/:idcuenta',async(req, res)=>{
    let id = req.params.idcuenta;
    let empresa = req.params.idempresa;
    let company = req.params.idcompany;

    try {
        let cuentacontable = await cuentascontables.find({_id: id, company, empresa}).populate([
            {path: 'deprefinanciera', select: 'nombre'},
            {path: 'deprefiscal', select: 'nombre'}
        ]);
        res.json({
            ok: true,
            cuentacontable
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

    let order_by_status =  req.query.order_by_status;
    order_by_status = Number(order_by_status);

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);

    try {
        let cuentacontable = await cuentascontables.find({company, empresa}).or([
            {'datos.clave':{$regex: search}},
            {'datos.nombre':{$regex: search}},
            {'datos.descripcion':{$regex: search}}

        ]).sort({
            'datos.clave': order_by_clave,
            'datos.nombre': order_by_nombre,
            'datos.descripcion': order_by_descripcion,
            'datos.estado': order_by_status,
        }).skip(desde).limit(limite);

        //valuar documentos con la porpierdad datos existente para el conteo
        let where = { datos: {$exists: true, $not: {$size: 0}} };
        let tota_document = await cuentascontables.count({company, empresa}).where(where);

        res.json({
            ok: true,
            cuentacontable,
            tota_document
        })
    } catch (e) {
        res.status(500).json(e);
    }
})

module.exports = router;