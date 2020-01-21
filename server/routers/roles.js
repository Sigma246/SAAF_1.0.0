const express = require('express');
const router = express.Router();
const {Permisos} = require('../models/SchemaRoles');
const {Company} = require('../models/SchemaCompany');
const {Usuario} = require('../models/SchemaUsuarios');
const { check, validationResult } = require('express-validator');

router.post('/post/:idcompany',async(req, res)=>{

    let body = req.body;
    let company = req.params.idcompany;
    
    try {
        let Permiso = new Permisos({
            nombre: body.nombre,
            permisos: body.permisos,
            company
        });
        let permisosDB = await Permiso.save();
        res.json({
            ok: true,
            Permiso: permisosDB,
        });
    } catch (e) {
        res.status(500).json(e);
    }
});

router.put('/put/:idcompany/:idrole',async(req, res)=>{
    let body = req.body;
    let id = req.params.idrole;
    let company = req.params.idcompany;
    
    try {

        let Permiso = new Permisos({
            nombre: body.nombre,
            permisos: body.permisos,
            _id: id,
        });

        let permisosDB = await Permisos.findOneAndUpdate({_id: id, company}, Permiso);

        res.json({
            ok: true,
            Permiso: permisosDB,
            message: "Roles Actulizado"
        });
    } catch (e) {
        res.status(500).json(e);
    }
});

router.get('/get/:idcompany/:idrole',async(req, res)=>{
    let id = req.params.idrole;
    let company = req.params.idcompany;

    try {
        let permisos = await Permisos.findOne({_id: id, company});
        res.json({
            ok: true,
            permisos,
        });
    } catch (e) {
        res.status(500).json(e);
    }
});

router.get('/get/:idcompany',async(req, res)=>{
    let company = req.params.idcompany;
    let search = req.query.search;

    let orderby_nombre = req.query.orderby_nombre;
    orderby_nombre = Number(orderby_nombre);

    let orderby_estado = req.query.orderby_estado;
    orderby_estado = Number(orderby_estado);

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);
    try {
        let roles = await Permisos.find({
            company,
            "nombre" : { $regex: search, $options: 'i' }
        }).sort({
            'nombre':orderby_nombre,
            'estado':orderby_estado
        }).skip(desde).limit(limite);

        let tota_document = await Permisos.countDocuments({company});        

        res.json({
            ok: true,
            roles,
            tota_document
        });
    } catch (e) {
        res.status(500).json(e);
    }
}); 


router.delete('/delete/:idcompany/:idrole',async(req, res)=>{
    let id = req.params.idrole;
    let company = req.params.idcompany;

    try {
        let permisos = await Permisos.findOneAndDelete({_id: id, company});
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