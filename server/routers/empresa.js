const express = require('express');
const router = express.Router();
const {Empresa} = require('../models/SchemaEmpresa');
const {Company} = require('../models/SchemaCompany');
const {Ubicacion} = require('../models/SchemaUbicacion');
const {camempleados} = require('../models/SchemaCamposEmpleados');
const {Catalogo} = require('../models/SchemaCatalogos');
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
    let company = req.params.idcompany;

    try {
        let empresa = new Empresa({
            nombre: body.nombre,
            nombre_corto: body.nombre_corto,
            company
        });
        let empresaDB = await empresa.save();  
       

        res.json({
          ok: true,
          empresa: empresaDB,
        });

        //Crea Directorio de ubicacion para empresa
        let ubicacion = new Ubicacion({
          nombre: empresaDB._id,
          company,
          empresa: empresaDB._id,
          children: []
        });
        let ubicacion_ = await ubicacion.save();

        //Crea Campos default para captura de empleados
        let campos_default = [
          {nombre:"clave",company,empresa: empresaDB._id},
          {nombre:"nombre",company,empresa: empresaDB._id},
          {nombre:"apellido",company,empresa: empresaDB._id},
          {nombre:"puesto",company,empresa: empresaDB._id},
        ]
        let CamposEmpleados = await camempleados.insertMany(campos_default)

        // Crea Campos default para Catalogos
        let Catalogos =[
          {
            nombre: "Aseguradora",clave: "Aseguradora",
            company,
            empresa: empresaDB._id,
            elementos:[
              {clave: "ZURICH",valor: "Zurich Seguros"}
            ]
          },
          {
            nombre: "Estado Físico",clave: "Estado Físico",
            company,
            empresa: empresaDB._id,
            elementos:[
              {clave: "EXCELENT",valor: "Excelente"},
              {clave: "GOOD",valor: "Bueno"},
              {clave: "MEDIUM",valor: "Regular"},
              {clave: "BAD",valor: "Malo"}
            ]
          },
          {
            nombre: "Motívo de baja",clave: "Motívo de baja",
            company,
            empresa: empresaDB._id,
            elementos:[
              {clave: "SELL",valor: "Venta"},
              {clave: "DAMANGE",valor: "Daño"}
            ]
          },
          {
            nombre: "Estatus",clave: "Estatus",
            company,
            empresa: empresaDB._id,
            elementos:[
              {clave: "DEPRECIATING",valor: "Depreciandose"},
              {clave: "NOT_DEPRECIATIONG",valor: "No Depreciandose"},
              {clave: "IN_CONSTRUCTION",valor: "En construcción"}
            ]
          },
          {
            nombre: "Moneda",clave: "Moneda",
            company,
            empresa: empresaDB._id,
            elementos:[
              {clave: "MXN",valor: "Pesos mexicanos"},
              {clave: "USD",valor: "Dolares estadounidenses"},
              {clave: "EUR",valor: "Euros"}
            ]
          },
          {
            nombre: "Condición de compra",clave: "Condición de compra",
            company,
            empresa: empresaDB._id,
            elementos:[
              {clave: "NEW",valor: "Nuevo"},
              {clave: "USED",valor: "Usado"}
            ]
          },
          {
            nombre: "País",clave: "País",
            company,
            empresa: empresaDB._id,
            elementos:[
              {clave: "MEX",valor: "México"},
              {clave: "USA",valor: "Estados Unidos de América"}
            ]
          },
        ]
        let DocumentoCatalogos = await Catalogo.insertMany(Catalogos);
        
    } catch (e) {
        res.status(500).json(e);
    }
}); 


router.get('/:idcompany',async(req, res)=>{
  let body = req.body;
  let company= req.params.idcompany;

  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 10;
  limite = Number(limite);

    try {
      let empresa = await Empresa.find({'company': company}).skip(desde).limit(limite);
      res.json({
        ok: true,
        empresa
      });
    } catch (e) {
      res.status(500).json(e);
    }
  });

router.get('/:idCompany/:idEmpresa',async(req, res)=>{
    
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

router.put('/:idCompany/:idEmpresa',async(req, res)=>{
  let body = req.body;  
  let idempresa = req.params.idEmpresa;
  let idcompany = req.params.idCompany;
    
    try {  
      let empresa = await Empresa.findByIdAndUpdate({_id: idempresa,company: idcompany },{$set:{
        'nombre':body.nombre, 
        'nombre_corto':body.nombre_corto, 
        'estado':body.estado
      }});  
      res.json({
        ok: true,
        message: "Empresa Actualizada",
        empresa
      });
    } catch (e) {
      res.status(500).json(e);
    }
  });


  router.delete('/:idCompany/:idEmpresa',async(req, res)=>{
    let body = req.body;
    let idcompany = req.params.idCompany;
    let idempresa = req.params.idEmpresa;
    try {
      let empresa = await Empresa.findOneAndDelete({_id: idempresa, company: idcompany });  
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