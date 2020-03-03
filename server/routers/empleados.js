const express = require('express');
const router = express.Router();
const {empleados} = require('../models/SchemaEmpleados');
const {camempleados} = require('../models/SchemaCamposEmpleados');
const { check, validationResult } = require('express-validator');

router.post('/post/:idcompany/:idempresa',async(req, res)=>{

    let body = req.body;
    let company = req.params.idcompany;
    let empresa = req.params.idempresa;

    try {
        let empleadodb = new empleados({
            clave: body.clave,
            nombre: body.nombre,
            apellido: body.apellido,
            posicion: body.posicion,
            campos_extra: body.campos_extra,
            company,
            empresa
        })
        let empleado = await empleadodb.save();
        res.json({
            ok: true,
            empleado
        });
    } catch (e) {
        res.status(500).json(e);
    }
});

router.put('/put/:idcompany/:idempresa/:idempleado',async(req, res)=>{
    
    let body = req.body;
    let id = req.params.idempleado;
    let company = req.params.idcompany;
    let empresa = req.params.idempresa;


    try {

        let empleado = await empleados.findOneAndUpdate({_id: id, company, empresa}, {$set:{
            'clave': body.clave,
            'nombre': body.nombre,
            'apellido': body.apellido,
            'posicion': body.posicion,
            'campos_extra': body.campos_extra,
            'estado': body.estado,
        }});
        res.json({
            ok: true,
            empleado,
        });
    } catch (e) {
        res.status(500).json(e);
    }
});

router.get('/get/:idcompany/:idempresa/:idempleado',async(req, res)=>{
    let id = req.params.idempleado;
    let company = req.params.idcompany;
    let empresa = req.params.idempresa;

    try {
        let empleado = await empleados.findOne({_id: id, company, empresa});
        res.json({
            ok: true,
            empleado,
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

    let order_by_clave =  req.query.order_by_clave;
    order_by_clave = Number(order_by_clave);

    let order_by_apellido =  req.query.order_by_apellido;
    order_by_apellido = Number(order_by_apellido);

    let order_by_puesto =  req.query.order_by_puesto;
    order_by_puesto = Number(order_by_puesto);

    let order_by_estado =  req.query.order_by_estado;
    order_by_estado = Number(order_by_estado);

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);  

    try {
        let empleado = await empleados.find({company, empresa}).or([
            {'clave':{$regex: search}},
            {'nombre':{$regex: search}},
            {'apellido':{$regex: search}},
            {'posicion':{$regex: search}},
        ]).sort({
            'clave': order_by_clave,
            'nombre': order_by_nombre,
            'apellido': order_by_apellido,
            'posicion': order_by_puesto
        }).skip(desde).limit(limite);

        let tota_document = await empleados.countDocuments({company, empresa}).or([
            {'clave':{$regex: search}},
            {'nombre':{$regex: search}},
            {'apellido':{$regex: search}},
            {'posicion':{$regex: search}},
        ]);

        res.json({
            ok: true,
            empleado,
            tota_document
        });
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;