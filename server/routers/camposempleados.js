const express = require('express');
const router = express.Router();
const {camempleados} = require('../models/SchemaCamposEmpleados');
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
        let campoempleado = new camempleados({

            nombre: body.nombre,
            clave: body.clave,
            elementos: body.elementos,
            company,
            empresa,
            
        })
        let campo = await campoempleado.save();
        res.json({
            ok: true,
            campo
        });
    } catch (e) {
        res.status(500).json(e);
    }
});

router.put('/elementos/:idcompany/:idempresa/:idcampo/',async(req, res)=>{

    let body = req.body;
    let company = req.params.idcompany;
    let empresa = req.params.idempresa;
    let id = req.params.idcampo;

    try {

        let campoempleado = new camempleados({
            elementos: body.elementos,
        })
        let campo =  await camempleados.findById({company, empresa, _id: id});
        let actualizado = await camempleados.updateOne({company, empresa, _id: id}, {$set: {elementos: campoempleado.elementos }});
        res.json({
            ok: true,
            campo
        });
    } catch (e) {
        res.status(500).json(e);
    }
})


router.put('/put/:idcompany/:idempresa/:idcampo/',[
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
    let id = req.params.idcampo;

    try {
        let actualizado = await camempleados.updateOne({ company, empresa, _id: id }, {$set: {
            'nombre': body.nombre,
            'clave': body.clave,
            'estado': body.estado
        }});
        let campo =  await camempleados.findById({company, empresa, _id: id});
        res.json({
            ok: true,
            campo
        });
    } catch (e) {
        res.status(500).json(e);
    }

})


router.get('/get/:idcompany/:idempresa/:idcampo',async(req, res)=>{
    
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


router.get('/get/:idcompany/:idempresa',async(req, res)=>{
    
    let company = req.params.idcompany;
    let empresa = req.params.idempresa;
    let search = req.query.search;

    let order_by_nombre = req.query.order_by_nombre;
    order_by_nombre = Number(order_by_nombre);

    let order_by_rol =  req.query.order_by_rol;
    order_by_rol = Number(order_by_rol);

    let order_by_estado =  req.query.order_by_estado;
    order_by_estado = Number(order_by_estado);

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);  

    try {
        let campoempleado = await camempleados.find({company, empresa}).or([
            {'nombre':{$regex: search}}
        ]).sort({
            'nombre': order_by_nombre,
            'estado': order_by_estado,
            'rol': order_by_rol,
        }).skip(desde).limit(limite);

        let tota_document = await camempleados.countDocuments({company, empresa}).or([
            {'nombre':{$regex: search}}
        ]);

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
