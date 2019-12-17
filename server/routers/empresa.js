const express = require('express');
const router = express.Router();
const {Empresa} = require('../models/SchemaEmpresa');
const {Company} = require('../models/SchemaCompany');
const { check, validationResult } = require('express-validator');

router.post('/:idcompany',[
    check('nombre').isLength({ min: 4 }),
    check('nombre_corto').isLength({ min: 4 })
],async(req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    let body = req.body;
    let id = req.params.idcompany;

    try {
        let empresa = new Empresa({
            nombre: body.nombre,
            nombre_corto: body.nombre_corto,
            company: id
        });
        let empresaDB = await empresa.save();  
        let company = await Company.updateOne({_id: id}, {$push: {empresa: empresa.id }});

        res.json({
          ok: true,
          empresa: empresaDB,
          company
        });
    } catch (e) {
        res.status(500).json(e);
    }
}); 


router.get('/',async(req, res)=>{
    try {
      let empresa = await Empresa.find();  
      res.json({
        ok: true,
        empresa
      });
    } catch (e) {
      res.status(500).json(e);
    }
  });

router.get('/:idEmpresa',async(req, res)=>{
    let id = req.params.idEmpresa;
    try {
        let empresa = await Empresa.findById({_id: id });  
        res.json({
        ok: true,
        empresa
        });
    } catch (e) {
        res.status(500).json(e);
    }
}); 

router.put('/:idEmpresa',async(req, res)=>{
    let id = req.params.idEmpresa;
    let body = req.body;
    
    try {
        let empresadb = new Empresa({
            _id: id,
            nombre: body.nombre,
            nombre_corto: body.nombre_corto
        });
      let empresa = await Empresa.findByIdAndUpdate(id, empresadb);  
      res.json({
        ok: true,
        message: "Empresa Actualizada",
        empresa
      });
    } catch (e) {
      res.status(500).json(e);
    }
  });


  router.delete('/:idEmpresa',async(req, res)=>{
    let id = req.params.idEmpresa;
    try {
      let empresa = await Empresa.findOneAndDelete({_id: id });  
      res.json({
      ok: true,
      message: "Empresa Eliminada",
      empresa
      });
    } catch (e) {
      res.status(500).json(e);
    }
  });

module.exports = router;