const express = require('express');
const router = express.Router();
const {Usuario} = require('../models/SchemaUsuarios');
const {Company} = require('../models/SchemaCompany');
const {Permisos} = require('../models/SchemaRoles');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const {verificarLogin} = require('../middlewares/autenticacion');

  router.post('/idcompany',[
    check('datos.email').isEmail(),
    check('datos.password').isLength({ min: 4 })
  ],async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let body = req.body;
    let id = body.idcompany;
    const hashPassword = await bcrypt.hash(body.datos.password, 10)
    
    //let company = await Company.find().where('_id').in(body.company);
    
    try {
      
      let usuario = new Usuario({
        datos:{
          nombre: body.datos.nombre,
          apellido: body.datos.apellido,
          email: body.datos.email,
          password: hashPassword
        },
        company: id
      });
      
      let usuarioDB = await usuario.save();  
      let company = await Company.updateOne({_id: id}, {$push: {usuarios: usuario.id }});

        res.json({
          ok: true,
          usuario: usuarioDB,
          company
        });
    } catch (e) {
      res.status(500).json(e);
    }
  });
 

router.get('/idcompany',async(req, res)=>{
  let body = req.body;
  try {
    let company = await Company.find({_id : body.idcompany}).populate({path:'usuarios'});  
    res.json({
      ok: true,
      usuario: company
    });
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get('/idUser',async(req, res)=>{
  let body = req.body;
  let id = body.idUser;
  
  try {
    let Usuarios = await Usuario.findById({_id: id }).populate({path: 'company'}).populate({path: 'permisos'});
    res.json({
      ok: true,
      usuario: Usuarios
    });
  } catch (e) {
    res.status(500).json(e);
  }
});


router.delete('/idUser',async(req, res)=>{
  let body = req.body;
  let id = body.idUser;
  try {
    let Usuarios = await Usuario.findOneAndDelete({_id: id });  
    res.json({
      ok: true,
      usuario: Usuarios,
      message: "El usuario fue Eliminado"
    });
  } catch (e) {
    res.status(500).json(e);
  }
});

router.put('/idcompany/idUser/permisos',async(req, res)=>{
  let body = req.body;
  let id = body.idUser;
  let company =  body.idcompany;
  let idpermisos =  body.permisos;
  
  try {
    let usuario =  await Usuario.findById({_id: id}).populate({path:'permisos'});
    let permisos = await Usuario.updateOne({_id: id}, {$set: {permisos: idpermisos }});
    res.json({
      ok: true,
      usuario,
      message: "Permiso modificado"
    });
  } catch (e) {
    res.status(500).json(e);
  }

});

router.put('/idcompany/idUser',async(req, res)=>{
  let body = req.body;
  let id = body.idUser;
  let company =  body.idcompany;
  
  const hashPassword = await bcrypt.hash(body.datos.password, 10);
  
  try {
    let usuario = new Usuario({
      datos:{
        nombre: body.datos.nombre,
        apellido: body.datos.apellido,
        email: body.datos.email,
        password: hashPassword,
      },
    });

    let Usuarios = await Usuario.findOneAndUpdate({_id: id},{$set:{datos: usuario.datos}});
    
    res.json({
      ok: true,
      usuario: Usuarios,
      message: "Usuario Actualizado"
    });
  } catch (e) {
    res.status(500).json(e);
  }
});

  module.exports = router;