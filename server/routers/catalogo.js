const express = require('express');
const router = express.Router();
const {Catalogo} = require('../models/SchemaCatalogos');
const {Empresa} = require('../models/SchemaEmpresa');
const { check, validationResult } = require('express-validator');

router.post('/',[
    //check('clave').isLength({ min: 2 }),
],async(req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let body = req.body;
    let idempresa = req.params.idempresa;
    let idcompany = req.params.idcompany;
   
       
        
        Catalogo.insertMany(catalogodb, (err, docs)=>{
            if(!err) console.log(err);

            res.json({
                ok: true,
                docs
            })

        });
        
        
   
});


module.exports = router;