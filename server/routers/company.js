const express = require('express');
const router = express.Router();
const {Company} = require('../models/SchemaCompany');
const {Empresa} = require('../models/SchemaEmpresa');
const {inpc} = require('../models/SchemaInpc');
const { check, validationResult } = require('express-validator');
const Role = require('../helpers/roles');
const autorize = require('../middlewares/role');
const {verificarLogin} = require('../middlewares/autenticacion');

router.post('/',[verificarLogin,autorize([Role.companies_edit])],[
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

        //Crea campos default inpc
        let inpcDefault = [
          {
            year: "1998",
            meses:{1:45.2633, 2:46.0557, 3:46.5952, 4:47.0311, 5:47.4058, 6:47.9661, 7:48.4286, 8:48.8942, 9:49.6872, 10:50.3992, 11:51.2917, 12:52.5432},
            company: companyDB.id,    
          },
          {
            year: "1999",
            meses:{1:53.8701, 2:54.594, 3:55.1012, 4:55.6069, 5:55.9414, 6:56.309, 7:56.6811, 8:57.0002, 9:57.5509, 10:57.9155, 11:58.4305, 12:59.0158},
            company: companyDB.id,    
          },
          {
            year: "2000",
            meses:{1:44.9308, 2:45.3294, 3:45.5807, 4:45.84, 5:46.0114, 6:46.2839, 7:46.4645, 8:46.7198, 9:47.0611, 10:47.3851, 11:47.7903, 12:48.3077},
            company: companyDB.id,    
          },
          {
            year: "2001",
            meses:{1:48.5755, 2:48.5433, 3:48.8509, 4:49.0973, 5:49.21, 6:49.3264, 7:49.1982, 8:49.4897, 9:49.9504, 10:50.1761, 11:50.3651, 12:50.4349},
            company: companyDB.id,    
          },
          {
            year: "2002",
            meses:{1:50.9005, 2:50.8678, 3:51.1279, 4:51.4072, 5:51.5114, 6:51.7626, 7:51.9112, 8:52.1086, 9:52.422, 10:52.653, 11:53.0789, 12:53.3099},
            company: companyDB.id,    
          },
          {
            year: "2003",
            meses:{1:53.5254, 2:53.6741, 3:54.0129, 4:54.1051, 5:53.9306, 6:53.9751, 7:54.0533, 8:54.2155, 9:54.5382, 10:54.7382, 11:55.1925, 12:55.4298},
            company: companyDB.id,    
          },
          {
            year: "2004",
            meses:{1:55.7743, 2:56.1079, 3:56.2981, 4:56.383, 5:56.2416, 6:56.3317, 7:56.4794, 8:56.828, 9:57.2979, 10:57.6947, 11:58.1869, 12:58.3071},
            company: companyDB.id,    
          },
          {
            year: "2005",
            meses:{1:58.3092, 2:58.5034, 3:58.7671, 4:58.9764, 5:58.8283, 6:58.7718, 7:59.0018, 8:59.0723, 9:59.309, 10:59.4546, 11:59.8825, 12:60.2503},
            company: companyDB.id,    
          },
          {
            year: "2006",
            meses:{1:60.6036, 2:60.6964, 3:60.7725, 4:60.8616, 5:60.5907, 6:60.643, 7:60.8093, 8:61.1196, 9:61.7366, 10:62.0065, 11:62.3319, 12:62.6924},
            company: companyDB.id,    
          },
          {
            year: "2007",
            meses:{1:63.0162, 2:63.1923, 3:63.3291, 4:63.2913, 5:62.9825, 6:63.0582, 7:63.326, 8:63.584, 9:64.0777, 10:64.3274, 11:64.7812, 12:65.0491},
            company: companyDB.id,    
          },
          {
            year: "2008",
            meses:{1:65.3506, 2:65.5448, 3:66.0199, 4:66.1701, 5:66.0986, 6:66.3722, 7:66.7421, 8:67.1275, 9:67.5849, 10:68.0455, 11:68.8189, 12:69.2956},
            company: companyDB.id,    
          },
          {
            year: "2009",
            meses:{1:69.4561, 2:69.6095, 3:70.01, 4:70.255, 5:70.0504, 6:70.1794, 7:70.3705, 8:70.5389, 9:70.8927, 10:71.1072, 11:71.476, 12:71.7719},
            company: companyDB.id,    
          },
          {
            year: "2010",
            meses:{1:72.552, 2:72.9717, 3:73.4897, 4:73.2556, 5:72.794, 6:72.7712, 7:72.9292, 8:73.1318, 9:73.5151, 10:73.9689, 11:74.5616, 12:74.931},
            company: companyDB.id,    
          },
          {
            year: "2011",
            meses:{1:75.296, 2:75.5785, 3:75.7235, 4:75.7174, 5:75.1593, 6:75.1555, 7:75.5161, 8:75.6356, 9:75.8211, 10:76.3327, 11:77.1583, 12:77.7924},
            company: companyDB.id,    
          },
          {
            year: "2012",
            meses:{1:78.343, 2:78.5023, 3:78.5474, 4:78.301, 5:78.0538, 6:78.4137, 7:78.8539, 8:79.0905, 9:79.4391, 10:79.841, 11:80.3834, 12:80.5682},
            company: companyDB.id,    
          },
          {
            year: "2013",
            meses:{1:80.8928, 2:181.2909, 3:81.8874, 4:81.9415, 5:81.6688, 6:81.6192, 7:81.5922, 8:81.8243, 9:82.1323, 10:82.523, 11:83.2923, 12:83.7701},
            company: companyDB.id,    
          },
          {
            year: "2014",
            meses:{1:84.5191, 2:84.7332, 3:84.9653, 4:84.8068, 5:84.5356, 6:84.6821, 7:84.915, 8:85.22, 9:85.5963, 10:86.0696, 11:86.7638, 12:87.189},
            company: companyDB.id,    
          },
          {
            year: "2015",
            meses:{1:87.1101, 2:87.2754, 3:87.6307, 4:87.4038, 5:86.9674, 6:87.1131, 7:87.2408, 8:87.4249, 9:87.7524, 10:88.2039, 11:88.6855, 12:89.0468},
            company: companyDB.id,    
          },
          {
            year: "2016",
            meses:{1:89.3864, 2:89.7778, 3:89.91, 4:89.6253, 5:89.2256, 6:89.324, 7:89.5569, 8:89.8093, 9:90.3577, 10:90.9062, 11:91.6168, 12:92.039},
            company: companyDB.id,    
          },
          {
            year: "2017",
            meses:{1:93.6039, 2:94.1448, 3:94.7225, 4:94.8389, 5:94.7255, 6:94.9636, 7:95.3227, 8:95.7938, 9:96.0935, 10:96.6983, 11:97.6952, 12:98.2729},
            company: companyDB.id,    
          },
          {
            year: "2018",
            meses:{1:98.795, 2:99.1714, 3:99.4922, 4:99.1548, 5:98.9941, 6:99.3765, 7:99.909, 8:100.492, 9:100.917, 10:101.44, 11:102.303, 12:103.02},
            company: companyDB.id,    
          },
          {
            year: "2019",
            meses:{1:103.108, 2:103.079, 3:103.476, 4:103.531, 5:103.233, 6:103.299, 7:103.687, 8:0, 9:0, 10:0, 11:0, 12:0},
            company: companyDB.id,    
          },
        ]

        let camposinpc = await inpc.insertMany(inpcDefault);

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

router.get('/:idCompany',[verificarLogin,autorize([Role.companies_edit])],async(req, res)=>{
    let body = req.body;
    let id = req.params.idCompany;
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

router.put('/:idCompany',[verificarLogin,autorize([Role.companies_edit])],async(req, res)=>{
    let body = req.body;
    let id = req.params.idCompany;
    let empresa = await Empresa.find().where('_id').in(body.empresa);
    try {
      let company = await Company.findByIdAndUpdate(id,{$set:{
        'nombre': body.nombre, 
        'nombre_corto': body.nombre_corto, 
        'estado': body.estado
      }},{new: true});
      res.json({
        ok: true,
        message: "Compañia Actualizada",
        company
      });
    } catch (e) {
      res.status(500).json(e);
    }
  });


  router.delete('/:idCompany',[verificarLogin,autorize([Role.companies_edit])],async(req, res)=>{
    let body = req.body;
    let id = req.params.idCompany;
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