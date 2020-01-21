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
            datos: body,
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
            datos: body.datos,
            'estado': body.estado
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
        let empleado = await empleados.find({_id: id, company, empresa});
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
            {'datos.clave':{$regex: search}},
            {'datos.nombre':{$regex: search}},
            {'datos.apellido':{$regex: search}},
            {'datos.puesto':{$regex: search}}
        ]).sort({
            'datos.clave': order_by_clave,
            'datos.nombre': order_by_nombre,
            'datos.apellido': order_by_apellido,
            'datos.puesto': order_by_puesto
        }).skip(desde).limit(limite);

        let tota_document = await empleados.count({company, empresa});

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