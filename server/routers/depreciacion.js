const express = require('express');
const router = express.Router();
const {Depreciacion} = require('../models/SchemaDepreciacion');
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
    let company = req.params.idcompany;
    let empresa = req.params.idempresa;

    try {
        let depreciaciondb = new Depreciacion({
            clave: body.clave,
            nombre: body.nombre,
            criterio: body.criterio,
            maximocatidad: body.maximocatidad,
            maximoporcentaje: body.maximoporcentaje,
            rangos: body.rangos,
            meses: body.meses,
            company,
            empresa
        });
        let depreciacion = await depreciaciondb.save();
        res.json({
            ok: true,
            depreciacion
        });
    } catch (e) {
        res.status(500).json(e);
    }

});

router.put('/put/:idcompany/:idempresa/:iddepreciacion',[
    check('clave').isLength({ min: 2 }),
    check('nombre').isLength({ min: 2 }),
],async(req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let body = req.body;
    let company = req.params.idcompany;
    let empresa = req.params.idempresa;
    let id = req.params.iddepreciacion;

    try {
        
        let depreciacion = await Depreciacion.updateOne({company, empresa, _id: id}, {$set: {
            'clave': body.clave,
            'nombre': body.nombre,
            'criterio': body.criterio,
            'maximocatidad': body.maximocatidad,
            'maximoporcentaje': body.maximoporcentaje,
            'rangos': body.rangos,
            'meses': body.meses
        }});

        res.json({
            ok: true,
            depreciacion
        });
    } catch (e) {
        res.status(500).json(e);
    }

});

router.get('/get/:idcompany/:idempresa/:iddepreciacion',async(req, res)=>{
    
    let company = req.params.idcompany;
    let empresa = req.params.idempresa;
    let id = req.params.iddepreciacion;

    try {
        let depreciacion = await Depreciacion.find({company, empresa, _id: id});
        res.json({
            ok: true,
            depreciacion
        });  
    } catch (e) {
        res.status(500).json(e);
    }

});

router.get('/get/:idcompany/:idempresa',async(req, res)=>{

    let company = req.params.idcompany;
    let empresa = req.params.idempresa;

    let search = req.query.search;

    let order_by_clave = req.query.order_by_clave;
    order_by_clave = Number(order_by_clave);

    let order_by_name = req.query.order_by_nombre;
    order_by_name = Number(order_by_name);

    let order_by_status =  req.query.order_by_estado;
    order_by_status = Number(order_by_status);

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);  

    try {
        let depreciacion = await Depreciacion.find({company, empresa}).or([
            {'clave':{$regex: search}},
            {'nombre':{$regex: search}},
        ]).sort({
            'nombre': order_by_name,
            'estado': order_by_status,
        }).skip(desde).limit(limite);;
        res.json({
            ok: true,
            depreciacion
        });  
    } catch (e) {
        res.status(500).json(e);
    }

});


router.delete('/delete/:idcompany/:idempresa/:iddepreciacion',async(req, res)=>{
    let id = req.params.iddepreciacion;
    let empresa = req.params.idempresa;
    let company = req.params.idcompany;

    try {
        let depreciacion = await Depreciacion.findOneAndDelete({company, empresa, _id: id});
        res.json({
            ok: true,
            depreciacion,
            message: "Depreciacion eliminada"
        });  
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;