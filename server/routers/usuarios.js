const express = require('express');
const router = express.Router();
const {Usuario} = require('../models/SchemaUsuarios');
const {Company} = require('../models/SchemaCompany');
const {Permisos} = require('../models/SchemaRoles');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const {verificarLogin} = require('../middlewares/autenticacion');

  router.post('/post/:idcompany',[
    check('email').isEmail(),
    check('password').isLength({ min: 4 })
  ],async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let body = req.body;
    let id = req.params.idcompany;
    const hashPassword = await bcrypt.hash(body.password, 10)
    
    //let company = await Company.find().where('_id').in(body.company);
    
    try {
  
      let usuario = new Usuario({
        nombre: body.nombre,
        apellido: body.apellido,
        email: body.email,
        password: hashPassword,
        passwordDate: body.passwordDate,
          companies: [{
            permisos: body.companies.permisos,
            company: id
          }]
        
      });
      
      let usuarioDB = await usuario.save();  
      //let company = await Company.updateOne({_id: id}, {$push: {usuarios: usuario.id }});

        res.json({
          ok: true,
          usuario: usuarioDB,
          //company
        });
    } catch (e) {
      res.status(500).json(e);
    }
  });
 

router.get('/get/:idcompany',async(req, res)=>{
  let search = req.query.search;
  let company = req.params.idcompany;

  let orderby_name = req.query.orderby_name ;
  orderby_name = Number(orderby_name);

  let orderby_apellido = req.query.orderby_apellido;
  orderby_apellido = Number(orderby_apellido);

  let orderby_email = req.query.orderby_email;
  orderby_email = Number(orderby_email);

  let desde = req.query.desde || 0;
    desde = Number(desde);

  let limite = req.query.limite || 10;
    limite = Number(limite);  

  try {
    let usuarios = await Usuario.find({'companies.company': company}).or([
      {'nombre':{$regex: search}},
      {'apellido':{$regex: search}},
      {'email':{$regex: search}}
    ]).sort({
      'nombre': orderby_name,
      'apellido': orderby_apellido,
      'email': orderby_email
    }).skip(desde).limit(limite).populate({
      path: 'companies.permisos',
      model: 'Permisos',
      select: 'nombre'
  });

    let tota_document = await Usuario.countDocuments({'companies.company': company});

    res.json({
      ok: true,
      usuarios,
      tota_document
    });
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get('/get/:idcompany/:idUser',async(req, res)=>{
  let body = req.body;
  let id = req.params.idUser;
  let company = req.params.idcompany;

  try {
    let usuario = await Usuario.find({_id: id, 'companies.company': company});
    res.json({
      ok: true,
      usuario
    });
  } catch (e) {
    res.status(500).json(e);
  }
});


router.delete('/delete/:idcompany/:idUser',async(req, res)=>{
  let body = req.body;
  let id = req.params.idUser;
  let company = req.params.idcompany;
  try {
    let Usuarios = await Usuario.findOneAndDelete({_id: id, company});
    res.json({
      ok: true,
      usuario: Usuarios,
      message: "El usuario fue Eliminado"
    });
  } catch (e) {
    res.status(500).json(e);
  }
});

router.put('/permisos/:idcompany/:idUser/:idcompanies',async(req, res)=>{
  let body = req.body;
  let id = req.params.idUser;
  let company =  req.params.idcompany;
  let idcompanies = req.params.idcompanies;
  
  try {
    let usuario =  await Usuario.findById({_id: id}).populate({
      path: 'companies.permisos',
      model: 'Permisos',
      select: 'permisos'
    });

    usuario.companies.map(function(dato){
      if(dato._id == idcompanies){
        dato.estado = body.estado;
        dato.created = body.created;
        dato.permisos = body.permisos;
      }
      return dato;
    });

    let permisos = await Usuario.findOneAndUpdate({'companies._id': idcompanies}, {$set: {companies: usuario.companies}});
    res.json({
      ok: true,
      usuario,
      message: "Permiso modificado"
    });
  } catch (e) {
    res.status(500).json(e);
  }
});

router.put('/put/:idcompany/:idUser',async(req, res)=>{
  let body = req.body;
  let id = req.params.idUser;
  let company =  req.params.idcompany;
  
  const hashPassword = await bcrypt.hash(body.password, 10);
  
  try {
    let usuario = new Usuario({
      nombre: body.nombre,
      apellido: body.apellido,
      email: body.email,
      password: hashPassword,
      passwordDate: body.passwordDate,
      estado: body.estado,
      root: body.root
    });

    let Usuarios = await Usuario.findOneAndUpdate({_id: id, 'companies.company': company},{$set:{
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      password: usuario.password,
      passwordDate: usuario.passwordDate,
      estado: usuario.estado,
      root: usuario.root
    }});
    
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