const express = require('express');
const router = express.Router();
const {Tdc} = require('../models/SchemaTdc');
const {Company} = require('../models/SchemaCompany');
const { check, validationResult } = require('express-validator');


router.post('/post/:idcompany',[
    check('moneda_origen').isLength({ min: 2 }),
    check('moneda_destino').isLength({ min: 2 })]
    ,async(req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
    }
        
    let body = req.body;
    let company = req.params.idcompany;
   
    try {
        let tdc = new Tdc({
            moneda_o: body.moneda_origen,
            moneda_d: body.moneda_destino,
            valor: body.valor,
            company    
        });

        let tipodecambio = await tdc.save();
        //let company = await Company.updateOne({_id: idcompany}, {$push: {tdc: tdc.id }});
        
        res.json({
            ok: true,
            tipodecambio,
            //company
          });
    } catch (e) {
        res.status(500).json(e);
    }
});

router.put('/put/:idcompany/:idtdc',[
    check('moneda_origen').isLength({ min: 2 }),
    check('moneda_destino').isLength({ min: 2 })]
    ,async(req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
    }
        
    let body = req.body;
    let id = req.params.idtdc;
    let idcompany = req.params.idcompany;
   
    try {
        let tdc = new Tdc({
            moneda_o: body.moneda_origen,
            moneda_d: body.moneda_destino,
            valor: body.valor,
            estado: body.estado,
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

router.get('/get/:idcompany/:idtdc',async(req, res)=>{
    let body = req.body;
    let id = req.params.idtdc;
    let company = req.params.idcompany;

    try {
        let tdc = await Tdc.findById({_id: id,company: company});
        res.json({
            ok: true,
            tipodecambio: tdc,
        });
    } catch (e) {
        res.status(500).json(e);
    }
});

router.get('/get/:idcompany',async(req, res)=>{
    let body =  req.body;
    let idcompany = req.params.idcompany
    let search = req.query.search;

    let order_by_origen = req.query.order_by_origen;
    order_by_origen = Number(order_by_origen);

    let order_by_destino = req.query.order_by_destino;
    order_by_destino = Number(order_by_destino);

    let order_by_fecha = req.query.order_by_fecha;
    order_by_fecha = Number(order_by_fecha);

    let order_by_valor = req.query.order_by_valor;
    order_by_valor = Number(order_by_valor);


    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);  
    
    try {
        let tipo_de_cambio = await Tdc.find({'company': idcompany}).or([
            {'moneda_o':{$regex: search}},
            {'moneda_d':{$regex: search}},
        ]).sort({
            'moneda_o': order_by_origen,
            'moneda_d': order_by_destino,
            'fecha': order_by_fecha,
            'valor': order_by_valor,
        }).skip(desde).limit(limite);

        let tota_document = await Tdc.countDocuments({'company': idcompany});

        res.json({
            ok: true,
            tdc: tipo_de_cambio,
            tota_document
        });
    } catch (e) {
        res.status(500).json(e);
    }
}); 

router.delete('/delete/:idcompany/:idtdc',async(req, res)=>{
    let id = req.params.idtdc;

    try {
        let tdc = await Tdc.findByIdAndDelete({_id: id});
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