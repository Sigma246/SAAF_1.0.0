const express = require('express');
const router = express.Router();
const {files} = require('../models/SchemaArchivos');
const { check, validationResult } = require('express-validator');
const fileUpload = require('express-fileupload');

router.use(fileUpload());

router.post('/post/:idcompany/:idempresa',async(req, res)=>{

    let body = req.body;
    let company = req.params.idcompany;
    let empresa = req.params.idempresa;
    let archivo = req.files.archivo;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            message: 'Error al subir el archivo'
        });
    }
    let nombre_imagen = "filename.png";
    archivo.mv(`server/files/${nombre_imagen}`, function(err) {
        if (err){
            return res.status(500).json({
                ok: false,
                message: 'Error al subir el archivo'
            });
        }
    });
    try {
        let archivos = new files({
            nombre: archivo.name,
            url:`https://murmuring-journey-73788.herokuapp.com/server/files/${nombre_imagen}`,
        });

        let imagenes = await archivos.save();
        
        res.json({
            ok: true,
            imagenes
        });
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;