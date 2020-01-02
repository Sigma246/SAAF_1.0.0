const express = require('express');
const router = express.Router();
const {Proyectos} = require('../models/SchemaProyectos');
const {Empresa} = require('../models/SchemaEmpresa');
const { check, validationResult } = require('express-validator');

router.post('/post/:idcompany/:idempresa',[
    check('clave').isLength({ min: 2 }),
    check('nombre').isLength({ min: 2 }),
    check('importe').isLength({ min: 1 }),

    ],async(req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let body = req.body;
    let company = req.params.idcompany;
    let empresa = req.params.idempresa;

    try {
        let proyectoDB = new Proyectos({
            clave: body.clave,
            nombre: body.nombre,
            importe: body.importe,
            company,
            empresa,
        });
        let proyecto = await proyectoDB.save();
       // let empresa = await Empresa.updateOne({_id: idempresa}, {$push: {proyectos: proyecto.id }});   
        res.json({
            ok: true,
            proyecto,
            //empresa
        });     
    } catch (e) {
        res.status(500).json(e);
    }
});


router.put('/put/:idcompany/:idempresa/:idproyecto',[
    check('clave').isLength({ min: 2 }),
    check('nombre').isLength({ min: 2 }),
    check('importe').isLength({ min: 1 }),

    ],async(req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let body = req.body;
    let company = req.params.idcompany;
    let empresa = req.params.idempresa;
    let id = req.params.idproyecto;

    try {
        let proyectoDB = new Proyectos({
            clave: body.clave,
            nombre: body.nombre,
            importe: body.importe,
            company,
            empresa,
            _id: id
        });
        let proyecto = await Proyectos.findOneAndUpdate({_id: id,company,empresa},proyectoDB);
        res.json({
            ok: true,
            proyecto,
            message: "Proyecto actualizado"
        });     
    } catch (e) {
        res.status(500).json(e);
    }
});


router.get('/get/:idcompany/:idempresa',async(req, res)=>{
    let company = req.params.idcompany;
    let empresa = req.params.idempresa;

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);

    try {
      let proyectos = await Proyectos.find({'empresa': empresa, 'company': company}).skip(desde).limit(limite);
      res.json({
        ok: true,
        proyectos
      });
    } catch (e) {
      res.status(500).json(e);
    }
});


router.get('/get/:idcompany/:idempresa/:idproyecto',async(req, res)=>{
    let company = req.params.idcompany;
    let empresa = req.params.idempresa;
    let id = req.params.idproyecto;
    try {
        let proyecto = await Proyectos.findOne({_id: id , company ,empresa});  
        res.json({
        ok: true,
        proyecto
        });
    } catch (e) {
        res.status(500).json(e);
    }
});


router.delete('/delete/:idcompany/:idempresa/:idproyecto',async(req, res)=>{
    let company = req.params.idcompany;
    let empresa = req.params.idempresa;
    let id = req.params.idproyecto;
    try {
        let proyecto = await Proyectos.findOneAndDelete({_id: id, company ,empresa });  
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