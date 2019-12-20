const express = require('express');
const router = express.Router();
const {Proveedores} = require('../models/SchemaProveedores');
const {Empresa} = require('../models/SchemaEmpresa');
const { check, validationResult } = require('express-validator');

router.post('/idempresa',[
    check('email').isEmail(),
    check('telefono').isLength({ min: 10 }),
    check('clave').isLength({ min: 2 }),
    check('nombre').isLength({ min: 2 }),
  ],async(req, res)=>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let body = req.body;
    let idempresa = body.idempresa;

    try {
        let proveedordb = new Proveedores({
            clave: body.clave,
            nombre: body.nombre,
            email: body.email,
            telefono: body.telefono,
            rfc: body.rfc,
            empresa: idempresa,
        });
        let proveedor = await proveedordb.save();
        let empresa = await Empresa.updateOne({_id: idempresa}, {$push: {proveedor: proveedor.id }});   
        res.json({
            ok: true,
            proveedor,
            empresa
        });     
    } catch (e) {
        res.status(500).json(e);
    }
});


router.put('/idempresa/idproveedor',[
    check('email').isEmail(),
    check('telefono').isLength({ min: 10 }),
    check('clave').isLength({ min: 2 }),
    check('nombre').isLength({ min: 2 }),
  ],async(req, res)=>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let body = req.body;
    let idempresa = body.idempresa;
    let id = body.idproveedor;

    try {
        let proveedordb = new Proveedores({
            clave: body.clave,
            nombre: body.nombre,
            email: body.email,
            telefono: body.telefono,
            rfc: body.rfc,
            _id: id
        });
        
        let proveedor = await Proveedores.findByIdAndUpdate({_id: id}, proveedordb);
        res.json({
            ok: true,
            proveedor
        });     
    } catch (e) {
        res.status(500).json(e);
    }
});

router.get('/idempresa',async(req, res)=>{
    let body = req.body;
    let id = body.idempresa;
    try {
      let empresa = await Empresa.findById(id).populate({path:'proveedor'});
      res.json({
        ok: true,
        empresa
      });
    } catch (e) {
      res.status(500).json(e);
    }
  });

router.get('/idEmpresa/idproveedor',async(req, res)=>{
    let body = req.body;
    let id = body.idproveedor;
    try {
        let proveedor = await Proveedores.findById({_id: id });  
        res.json({
        ok: true,
        proveedor
        });
    } catch (e) {
        res.status(500).json(e);
    }
});

router.delete('/idEmpresa/idproveedor',async(req, res)=>{
    let body = req.body;
    let id = body.idproveedor;
    try {
        let proveedor = await Proveedores.findByIdAndDelete({_id: id });  
        res.json({
        ok: true,
        proveedor,
        message:"Proveedor Eliminado"
        });
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;