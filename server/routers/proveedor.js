const express = require('express');
const router = express.Router();
const {Proveedores} = require('../models/SchemaProveedores');
const {Empresa} = require('../models/SchemaEmpresa');
const { check, validationResult } = require('express-validator');

router.post('/post/:idcompany/:idempresa',[
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
    let company = req.params.idcompany;
    let empresa = req.params.idempresa;

    try {
        let proveedordb = new Proveedores({
            clave: body.clave,
            nombre: body.nombre,
            email: body.email,
            telefono: body.telefono,
            rfc: body.rfc,
            company,
            empresa
        });
        let proveedor = await proveedordb.save();
        res.json({
            ok: true,
            proveedor,
        });     
    } catch (e) {
        res.status(500).json(e);
    }
});


router.put('/put/:idcompany/:idempresa/:idproveedor',[
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
    let company = req.params.idcompany;
    let empresa = req.params.idempresa;
    let id = req.params.idproveedor;

    try {
        let proveedordb = new Proveedores({
            clave: body.clave,
            nombre: body.nombre,
            email: body.email,
            telefono: body.telefono,
            rfc: body.rfc,
            _id: id
        });
        
        let proveedor = await Proveedores.findOneAndUpdate({_id: id,company,empresa}, proveedordb);
        res.json({
            ok: true,
            proveedor
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
      let proveedores = await Proveedores.find({'company': company, 'empresa': empresa}).skip(desde).limit(limite);
      res.json({
        ok: true,
        proveedores
      });
    } catch (e) {
      res.status(500).json(e);
    }
  });

router.get('/get/:idcompany/:idempresa/:idproveedor',async(req, res)=>{
    let company = req.params.idcompany;
    let empresa = req.params.idempresa;
    let id = req.params.idproveedor;

    try {
        let proveedor = await Proveedores.findOne({_id: id, company, empresa });  
        res.json({
        ok: true,
        proveedor
        });
    } catch (e) {
        res.status(500).json(e);
    }
});

router.delete('/delete/:idcompany/:idempresa/:idproveedor',async(req, res)=>{
    let company = req.params.idcompany;
    let empresa = req.params.idempresa;
    let id = req.params.idproveedor;
    try {
        let proveedor = await Proveedores.findOneAndDelete({_id: id, company, empresa });  
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