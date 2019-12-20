const express = require('express');
const router = express.Router();
const {Permisos} = require('../models/SchemaRoles');
const {Company} = require('../models/SchemaCompany');
const {Usuario} = require('../models/SchemaUsuarios');
const { check, validationResult } = require('express-validator');

router.post('/idcompany',async(req, res)=>{

    let body = req.body;
    let idcompany = body.idcompany;
    
    try {
        
        let Permiso = new Permisos({
            nombre: body.nombre,
            permisos: body.permisos,
            company: idcompany
        });

        let permisosDB = await Permiso.save();
        let company = await Company.updateOne({_id: idcompany}, {$push: {permisos: Permiso.id }});

        res.json({
            ok: true,
            Permiso: permisosDB,
            company
        });
    } catch (e) {
        res.status(500).json(e);
    }
});

router.put('/idcompany/idrole',async(req, res)=>{

    let body = req.body;
    let id = body.idrole;
    let idcompany = body.idcompany;
    
    try {

        let Permiso = new Permisos({
            nombre: body.nombre,
            permisos: body.permisos,
            _id: id,
        });

        let permisosDB = await Permisos.findByIdAndUpdate({_id: id}, Permiso);

        res.json({
            ok: true,
            Permiso: permisosDB,
            message: "Roles Actulizado"
        });
    } catch (e) {
        res.status(500).json(e);
    }
});

router.get('/idcompany/idrole',async(req, res)=>{
    let body = req.body;
    let id = body.idrole;
    let idcompany = body.idcompany;

    try {
        let permisos = await Permisos.findById(id);
        res.json({
            ok: true,
            permisos,
        });
    } catch (e) {
        res.status(500).json(e);
    }
});

router.get('/idcompany',async(req, res)=>{
    let body = req.body;
    let id = body.idcompany;
    try {
        let company = await Company.findById({_id: id }).populate({ path:'permisos' });
        res.json({
        ok: true,
        company
        });
    } catch (e) {
        res.status(500).json(e);
    }
}); 


router.delete('/idrole',async(req, res)=>{
    let body = req.body;
    let id = body.idrole;
    let idcompany = body.idcompany;

    try {
        let permisos = await Permisos.findByIdAndDelete(id);
        res.json({
            ok: true,
            permisos,
            message: "Role Eliminado"
        });
    } catch (e) {
        res.status(500).json(e);
    }

});




module.exports = router;