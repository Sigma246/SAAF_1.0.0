const express = require('express');
const router = express.Router();
const {Empleados} = require('../models/SchemaEmpleado');
const {Ubicacion} = require('../models/SchemaUbicacion');
const {centrodecostos} = require('../models/SchemaCentrodecostos');
const { check, validationResult } = require('express-validator');

router.post('/post/:idcompany/:idempresa',async(req, res)=>{
    
    let body = req.body;
    let empresa = req.params.idempresa;
    let company = req.params.idcompany;

    try {
        let empleadodb = new Empleados({
            clave: body.clave,
            nombre: body.nombre,
            apellido: body.apellido,
            puesto: body.puesto,
            empresa,
            company,
            ubicacion: body.ubicacion,
            centrodecostos: body.centrodecostos,
            departamento: body.departamento,
            jefedirecto: body.jefedirecto,
            email: body.email,
            extencion: body.extencion,
            extra: body.extra,
            fechain: body.fecha_ingreso
        });
        let empleado = await empleadodb.save();
        res.json({
            ok: true,
            empleado
        })
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;