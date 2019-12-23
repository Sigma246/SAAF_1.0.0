const express = require('express');
const router = express.Router();
const {Company} = require('../models/SchemaCompany');
const {Empresa} = require('../models/SchemaEmpresa');
const { check, validationResult } = require('express-validator');
const Role = require('../helpers/roles');
const autorize = require('../middlewares/role');
const {verificarLogin} = require('../middlewares/autenticacion');

router.post('/',[
    check('nombre').isLength({ min: 4 }),
    check('nombre_corto').isLength({ min: 4 })
],async(req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    let body = req.body;
    let empresa = await Empresa.find().where('_id').in(body.empresa);
    try {
        let company = new Company({
            nombre: body.nombre,
            nombre_corto: body.nombre_corto,
            empresa
        });
        let companyDB = await company.save();  

        res.json({
          ok: true,
          company: companyDB
        });
    } catch (e) {
        res.status(500).json(e);
    }
}); 


router.get('/',[verificarLogin,autorize([Role.companies_edit])],async(req, res)=>{
    try {
      let company = await Company.find();  
      res.json({
        ok: true,
        company
      });
    } catch (e) {
      res.status(500).json(e);
    }
  });

router.get('/idCompany',async(req, res)=>{
    let body = req.body;
    let id = body.idCompany;
    try {
        let company = await Company.findById({_id: id });
        res.json({
        ok: true,
        company
        });
    } catch (e) {
        res.status(500).json(e);
    }
}); 

router.put('/idCompany',async(req, res)=>{
    let body = req.body;
    let id = body.idCompany;
    let empresa = await Empresa.find().where('_id').in(body.empresa);
    try {
      let company = await Company.findByIdAndUpdate(id,{$set:{
        'nombre': body.nombre, 
        'nombre_corto': body.nombre_corto, 
        'estado': body.estado
      }});
      res.json({
        ok: true,
        message: "Compañia Actualizada",
        company
      });
    } catch (e) {
      res.status(500).json(e);
    }
  });


  router.delete('/idCompany',async(req, res)=>{
    let body = req.body;
    let id = body.idCompany;
    try {
      let company = await Company.findOneAndDelete({_id: id });  
      res.json({
      ok: true,
      message: "Compañia Eliminada",
      company
      });
    } catch (e) {
      res.status(500).json(e);
    }
  });

module.exports = router;