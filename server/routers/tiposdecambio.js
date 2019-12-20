const express = require('express');
const router = express.Router();
const {Tdc} = require('../models/SchemaTdc');
const {Company} = require('../models/SchemaCompany');
const { check, validationResult } = require('express-validator');


router.post('/idcompany',[
    check('moneda_origen').isLength({ min: 2 }),
    check('moneda_destino').isLength({ min: 2 })]
    ,async(req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
    }
        
    let body = req.body;
    let idcompany = body.idcompany;
   
    try {
        let tdc = new Tdc({
            moneda_o: body.moneda_origen,
            moneda_d: body.moneda_destino,
            valor: body.valor,
            company: idcompany    
        });

        let tipodecambio = await tdc.save();
        let company = await Company.updateOne({_id: idcompany}, {$push: {tdc: tdc.id }});
        
        res.json({
            ok: true,
            tipodecambio,
            company
          });
    } catch (e) {
        res.status(500).json(e);
    }
});

router.put('/idcompany/idtdc',[
    check('moneda_origen').isLength({ min: 2 }),
    check('moneda_destino').isLength({ min: 2 })]
    ,async(req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
    }
        
    let body = req.body;
    let id = body.idtdc;
    let idcompany = body.idcompany;
   
    try {
        let tdc = new Tdc({
            moneda_o: body.moneda_origen,
            moneda_d: body.moneda_destino,
            valor: body.valor,
            company: idcompany, 
            _id: id,
        });

        let tipodecambio = await Tdc.findByIdAndUpdate({_id: id}, tdc);
        
        res.json({
            ok: true,
            tipodecambio,
            message: "Tipo de cambio Actualizado"
        });
    } catch (e) {
        res.status(500).json(e);
    }
});

router.get('/idcompany/idtdc',async(req, res)=>{
    let body = req.body;
    let id = body.idtdc;
    let idcompany = body.idcompany;

    try {
        let tdc = await Tdc.findById(id);
        res.json({
            ok: true,
            tipodecambio: tdc,
        });
    } catch (e) {
        res.status(500).json(e);
    }
});

router.get('/idcompany',async(req, res)=>{
    let body =  req.body;
    let id = body.idcompany;
    try {
        let company = await Company.findById({_id: id }).populate({ path:'tdc' });
        res.json({
        ok: true,
        company
        });
    } catch (e) {
        res.status(500).json(e);
    }
}); 

router.delete('/idtdc',async(req, res)=>{
    let body = req.body;
    let id = body.idtdc;
    let idcompany = req.params.idcompany;

    try {
        let tdc = await Tdc.findByIdAndDelete(id);
        res.json({
            ok: true,
            tipodecambio: tdc,
            message: "Tipo de cambio Eliminado"
        });
    } catch (e) {
        res.status(500).json(e);
    }

});

module.exports = router;