const express = require('express');
const router = express.Router();
const {Ubicacion, Ubicacionrf} = require('../models/SchemaUbicacion');
const {Empresa} = require('../models/SchemaEmpresa');
const { check, validationResult } = require('express-validator');

router.put('/put/:idcompany/:idempresa/:idubicacion',[
    //check('nombre').isLength({ min: 3 }),
],async(req, res)=>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let body = req.body;
    let company = req.params.idcompany;
    let empresa = req.params.idempresa;
    let id = req.params.idubicacion;

    try {
        let ubicacion1 = await Ubicacion.updateMany({_id: id, company, empresa}, {$set:{'children': body.children}});
        let ubicacion = await Ubicacion.find({company, empresa});
        res.json({
            ok: true,
            ubicacion,
            mesaage: "ubicacion Actualizada"
        });
    } catch (e) {
        res.status(500).json(e);
    }
});

router.get('/get/:idcompany/:idempresa',async(req, res)=>{
    let company = req.params.idcompany;
    let empresa = req.params.idempresa;
    try {
        let ubicacion = await Ubicacion.find({company, empresa}).populate({path: "nombre",  select: "nombre"});
        res.json({
            ok: true,
            ubicacion,
        });
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;