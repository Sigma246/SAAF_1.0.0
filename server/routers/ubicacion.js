const express = require('express');
const router = express.Router();
const {Ubicacion} = require('../models/SchemaUbicacion');
const { check, validationResult } = require('express-validator');

router.post('/post/:idcompany/:idempresa',[
    //check('nombre').isLength({ min: 3 }),
],async(req, res)=>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let body = req.body;
    let company = req.params.idcompany;
    let empresa =  req.params.idempresa;

    try {
        let ubicacion = new Ubicacion({
            nombre: body.nombre,
            parent: body.parent,
            childs: body.childs,
            company,
            empresa
        });
        let ubicaciones = await Ubicacion.insertMany(body);
        res.json({
            ok: true,
            ubicaciones,
        });     
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;