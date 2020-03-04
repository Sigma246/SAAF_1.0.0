const express = require('express');
const router = express.Router();
const {camempleados} = require('../models/SchemaCamposEmpleados');
const { check, validationResult } = require('express-validator');

/* router.post('/post/:idcompany/:idempresa',[
    //check('campos.valor').isLength({ min: 2 }),
    //check('campos.rol').isLength({ min: 2 }),
],async(req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let body = req.body;
    let company = req.params.idcompany;
    let empresa = req.params.idempresa;

    try {
        let campo_empleado = new camempleados({
            campos_extra: body.campos_extra,
            company,
            empresa
        });
        let campoempleado = await campo_empleado.save();
        res.json({
            ok: true,
            campoempleado
        });
    } catch (e) {
        res.status(500).json(e);
    }

}); */


router.post('/post/:idcompany/:idempresa',async(req, res)=>{
    let body = req.body;
    let company = req.params.idcompany;
    let empresa = req.params.idempresa;
    
    try {
        
        let allCampos =  await camempleados.findOne({company, empresa});
        allCampos.campos_extra.push(body);
        
        let campoempleado = await camempleados.findOneAndUpdate({company, empresa},{$set:{
            'campos_extra': allCampos.campos_extra,
        }});

        res.json({
            ok: true,
            campoempleado: allCampos,
        });

    } catch (e) {
        res.status(500).json(e);
    }
})

router.put('/put/:idcompany/:idempresa/:idcampos/:idcampo',async(req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let body = req.body;
    let campos = req.params.idcampos;
    let campo = req.params.idcampo;
    let company = req.params.idcompany;
    let empresa = req.params.idempresa;
    
    try {

        let allCampos =  await camempleados.findById({_id: campos});

        allCampos.campos_extra.map(function(dato){
            if(dato._id == campo){
              dato.valor = body.valor;
              dato.estado = body.estado;
              dato.rol = body.rol;
              dato.nombre_campo = body.nombre_campo;
              dato.elements = body.elements
            }
            return dato;
          });

        let campoempleado = await camempleados.findOneAndUpdate({_id: campos, company, empresa},{$set:{
            'campos_extra': allCampos.campos_extra,
        }});
        res.json({
            ok: true,
            campoempleado: allCampos,
        });
    } catch (e) {
        res.status(500).json(e);
    }
});

/* router.get('/get/:idcompany/:idempresa/:idcampo',async(req, res)=>{
    
    let id = req.params.idcampo;
    let company = req.params.idcompany;
    let empresa = req.params.idempresa;

    try {
        let campoempleado = await camempleados.find({_id: id, company, empresa});
        res.json({
            ok: true,
            campoempleado
        });
    } catch (e) {
        res.status(500).json(e);
    }
});
 */

router.get('/get/:idcompany/:idempresa',async(req, res)=>{
    
    let company = req.params.idcompany;
    let empresa = req.params.idempresa;
    let search = req.query.search;

    let order_by_name = req.query.order_by_nombre;
    order_by_name = Number(order_by_name);

    let order_by_rol =  req.query.order_by_rol;
    order_by_rol = Number(order_by_rol);

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);  

    try {
        let campoempleado = await camempleados.find({company, empresa}).or([
            {'campos_extra.nombre_campo':{$regex: search}}
        ]).sort({
            'campos_extra.nombre_campo': order_by_name,
            'campos_extra.rol': order_by_rol,
        }).skip(desde).limit(limite);

        let tota_document = await camempleados.countDocuments({company, empresa});

        res.json({
            ok: true,
            campoempleado,
            tota_document
        });
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;
