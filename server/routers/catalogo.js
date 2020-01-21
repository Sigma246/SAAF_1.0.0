const express = require('express');
const router = express.Router();
const {Catalogo} = require('../models/SchemaCatalogos');
const {Empresa} = require('../models/SchemaEmpresa');
const { check, validationResult } = require('express-validator');

router.post('/post/:idcompany/:idempresa',[
    check('clave').isLength({ min: 2 }),
],async(req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let body = req.body;
    let idempresa = req.params.idempresa;
    let idcompany = req.params.idcompany;
           
    try {
        let catalogodb = new Catalogo({
            nombre: body.nombre,
            clave: body.clave,
            company: idcompany,
            empresa: idempresa,
            elementos: body.elementos
        });
        let catalogo = await catalogodb.save();
        res.json({
            ok: true,
            catalogo
        })
    } catch (e) {
        res.status(500).json(e);
    }    
});

router.get('/get/:idcompany/:idempresa/:idcatalogo',async(req, res)=>{
    let catalogo = req.params.idcatalogo;
    let empresa = req.params.idempresa;
    let company = req.params.idcompany;

    try {
        let catalogos = await Catalogo.find({company, empresa, _id: catalogo});
        res.json({
            ok: true,
            catalogos
        });  
    } catch (e) {
        res.status(500).json(e);
    }
});

router.get('/get/:idcompany/:idempresa/',async(req, res)=>{
    let empresa = req.params.idempresa;
    let company = req.params.idcompany;
    let search = req.query.search;

    let order_by_name = req.query.order_by_nombre;
    order_by_name = Number(order_by_name);

    let order_by_status =  req.query.order_by_estado;
    order_by_status = Number(order_by_status);

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);  

    try {
        let catalogos = await Catalogo.find({company, empresa}).or([
            {'nombre':{$regex: search}}
        ]).sort({
            'nombre': order_by_name,
            'estado': order_by_status,
        }).skip(desde).limit(limite);

        let tota_document = await Catalogo.count({company, empresa});

        res.json({
            ok: true,
            catalogos,
            tota_document
        });  
    } catch (e) {
        res.status(500).json(e);
    }

});

router.put('/elementos/:idcompany/:idempresa/:idcatalogo',[
    //check('clave').isLength({ min: 2 }),
],async(req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let body = req.body;
    let idcatalogo = req.params.idcatalogo;
    let empresa = req.params.idempresa;
    let company = req.params.idcompany;
           
    try {
        let catalogodb = new Catalogo({
            elementos: body.elementos
        });
        let catalogo =  await Catalogo.findById({company, empresa, _id: idcatalogo});
        let permisos = await Catalogo.updateOne({company, empresa, _id: idcatalogo}, {$set: {elementos: catalogodb.elementos }});
        res.json({
            ok: true,
            catalogo
        })
    } catch (e) {
        res.status(500).json(e);
    }    
});

router.put('/put/:idcompany/:idempresa/:idcatalogo',[
    check('clave').isLength({ min: 2 }),
],async(req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let body = req.body;
    let idcatalogo = req.params.idcatalogo;
    let empresa = req.params.idempresa;
    let company = req.params.idcompany;
           
    try {
        let catalogo1 = await Catalogo.updateOne({ company, empresa,_id: idcatalogo }, {$set: {'nombre': body.nombre, 'clave': body.clave}});
        let catalogo =  await Catalogo.findById({company, empresa, _id: idcatalogo});
        res.json({
            ok: true,
            catalogo
        })
    } catch (e) {
        res.status(500).json(e);
    }    
});

router.delete('/delete/:idcompany/:idempresa/:idcatalogo',async(req, res)=>{
    let catalogo = req.params.idcatalogo;
    let empresa = req.params.idempresa;
    let company = req.params.idcompany;

    try {
        let catalogos = await Catalogo.findOneAndDelete({company, empresa, _id: catalogo});
        res.json({
            ok: true,
            catalogos,
            message: "Catalogo eliminado"
        });  
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;