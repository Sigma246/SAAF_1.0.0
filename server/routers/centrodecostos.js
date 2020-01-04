const express = require('express');
const router = express.Router();
const {centrodecostos} = require('../models/SchemaCentrodecostos');
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
        
        let CentrodeCostos = new centrodecostos({
            clave: body.clave,
            nombre: body.nombre,
            descripcion: body.descripcion,
            company,
            empresa
        });

        let Centrodecostos = await CentrodeCostos.save();
        res.json({
            ok: true,
            Centrodecostos
        })
    } catch (e) {
        res.status(500).json(e);
    }
});


router.put('/put/:idcompany/:idempresa/:idcentrocosto',[
    check('clave').isLength({ min: 2 }),
    check('nombre').isLength({ min: 2 }),
],async(req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let body = req.body;
    let id = req.params.idcentrocosto;
    let empresa = req.params.idempresa;
    let company = req.params.idcompany;
    
    try {
        
        let Centrodecostos = await centrodecostos.findOneAndUpdate({_id: id, company, empresa},{$set: {
            'clave': body.clave, 
            'nombre': body.nombre, 
            'descripcion': body.descripcion 
        }})
        res.json({
            ok: true,
            Centrodecostos,
            message: "centro de costos Actualizado"
        })
    } catch (e) {
        res.status(500).json(e);
    }
});

router.get('/get/:idcompany/:idempresa',async(req, res)=>{
    let search = req.query.search;
    let empresa = req.params.idempresa;
    let company = req.params.idcompany;

    let orderby_clave = req.query.orderby_clave ;
    orderby_clave = Number(orderby_clave);
  
    let orderby_nombre = req.query.orderby_nombre;
    orderby_nombre = Number(orderby_nombre);
  
    let orderby_descripcion = req.query.orderby_descripcion;
    orderby_descripcion = Number(orderby_descripcion);


    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);  

    try {
        let Centrodecostos = await centrodecostos.find({company, empresa}).or([
            {'clave':{$regex: search}},
            {'nombre':{$regex: search}},
            {'descripcion':{$regex: search}}
          ]).sort({
            'clave': orderby_clave,
            'nombre': orderby_nombre,
            'descripcion': orderby_descripcion
          }).skip(desde).limit(limite);
        res.json({
            ok: true,
            Centrodecostos,
        })
    } catch (e) {
        res.status(500).json(e);
    }
});


router.get('/get/:idcompany/:idempresa/:idcentrocosto',async(req, res)=>{
    let id = req.params.idcentrocosto;
    let empresa = req.params.idempresa;
    let company = req.params.idcompany;
    try {
        let Centrodecostos = await centrodecostos.find({_id: id, company, empresa});
        res.json({
            ok: true,
            Centrodecostos,
        }) 
    } catch (e) {
        res.status(500).json(e);
    }
});


router.delete('/delete/:idcompany/:idempresa/:idcentrocosto',async(req, res)=>{
    let id = req.params.idcentrocosto;
    let empresa = req.params.idempresa;
    let company = req.params.idcompany;
    try {
        let Centrodecostos = await centrodecostos.findOneAndDelete({_id: id, company, empresa});
        res.json({
            ok: true,
            Centrodecostos,
            message:"Centro de costo Eliminada"
        }) 
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;