const express = require('express');
const router = express.Router();
const {Proyectos} = require('../models/SchemaProyectos');
const {Empresa} = require('../models/SchemaEmpresa');
const { check, validationResult } = require('express-validator');

router.post('/idempresa',[
    check('clave').isLength({ min: 2 }),
    check('nombre').isLength({ min: 2 }),
    check('importe').isLength({ min: 1 }),

    ],async(req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let body = req.body;
    let idempresa = body.idempresa;

    try {
        let proyectoDB = new Proyectos({
            clave: body.clave,
            nombre: body.nombre,
            importe: body.importe,
            empresa: idempresa
        });
        let proyecto = await proyectoDB.save();
        let empresa = await Empresa.updateOne({_id: idempresa}, {$push: {proyectos: proyecto.id }});   
        res.json({
            ok: true,
            proyecto,
            empresa
        });     
    } catch (e) {
        res.status(500).json(e);
    }
});


router.put('/idempresa/idproyecto',[
    check('clave').isLength({ min: 2 }),
    check('nombre').isLength({ min: 2 }),
    check('importe').isLength({ min: 1 }),

    ],async(req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let body = req.body;
    let idempresa = body.idempresa;
    let id = body.idproyecto;

    try {
        let proyectoDB = new Proyectos({
            clave: body.clave,
            nombre: body.nombre,
            importe: body.importe,
            empresa: idempresa,
            _id: id
        });
        let proyecto = await Proyectos.findByIdAndUpdate({_id: id},proyectoDB);
        res.json({
            ok: true,
            proyecto,
            message: "Proyecto actualizado"
        });     
    } catch (e) {
        res.status(500).json(e);
    }
});


router.get('/idempresa',async(req, res)=>{
    let body = req.body;
    let id = body.idempresa;
    try {
      let empresa = await Empresa.findById(id).populate({path:'proyectos'});
      res.json({
        ok: true,
        empresa
      });
    } catch (e) {
      res.status(500).json(e);
    }
});


router.get('/idEmpresa/idproyecto',async(req, res)=>{
    let body = req.body;
    let id = body.idproyecto;
    try {
        let proyecto = await Proyectos.findById({_id: id });  
        res.json({
        ok: true,
        proyecto
        });
    } catch (e) {
        res.status(500).json(e);
    }
});


router.delete('/idEmpresa/idproyecto',async(req, res)=>{
    let body = req.body;
    let id = body.idproyecto;
    try {
        let proyecto = await Proyectos.findByIdAndDelete({_id: id });  
        res.json({
        ok: true,
        proyecto,
        message: "Proyecto Eliminado"
        });
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;