const express = require('express');
const router = express.Router();
const {inpc} = require('../models/SchemaInpc');
const {Company} = require('../models/SchemaCompany');
const { check, validationResult } = require('express-validator');

router.post('/idcompany',[
    check('year').isLength({ min: 2 })]
    ,async(req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
    }
        
    let body = req.body;
    let idcompany = body.idcompany;
   
    try {
        let Inpc = new inpc({
            year: body.year,
            meses:{
                1: body.meses.enero,
                2: body.meses.febrero,
                3: body.meses.marzo,
                4: body.meses.abril,
                5: body.meses.mayo,
                6: body.meses.junio,
                7: body.meses.julio,
                8: body.meses.agosto,
                9: body.meses.septiembre,
                10: body.meses.octubre,
                11: body.meses.noviembre,
                12: body.meses.diciembre,
            },
            company: idcompany    
        });

        let inpcdb = await Inpc.save();
        let company = await Company.updateOne({_id: idcompany}, {$push: {inpc: Inpc.id }});
        
        res.json({
            ok: true,
            inpc: inpcdb,
            company
          });
    } catch (e) {
        res.status(500).json(e);
    }
});


router.put('/:idcompany/:idinpc',[
    check('year').isLength({ min: 2 })]
    ,async(req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
    }
        
    let body = req.body;
    let id = body.idinpc;
    let idcompany = body.idcompany;
   
    try {
        let Inpc = new inpc({
            year: body.year,
            meses:{
                1: body.meses.enero,
                2: body.meses.febrero,
                3: body.meses.marzo,
                4: body.meses.abril,
                5: body.meses.mayo,
                6: body.meses.junio,
                7: body.meses.julio,
                8: body.meses.agosto,
                9: body.meses.septiembre,
                10: body.meses.octubre,
                11: body.meses.noviembre,
                12: body.meses.diciembre,
            },
            _id: id    
        });

        let inpcdb = await inpc.findByIdAndUpdate(id,Inpc);
        
        res.json({
            ok: true,
            inpc: inpcdb,
            message: "El inpc fue actualizado"
          });
    } catch (e) {
        res.status(500).json(e);
    }
});



router.get('/idcompany/idinpc',async(req, res)=>{
    let body =  req.body;
    let id = body.idinpc;
    let idcompany = body.idcompany;

    try {
        let Inpc = await inpc.findById(id);
        res.json({
            ok: true,
            inpc: Inpc
        });
    } catch (e) {
        res.status(500).json(e);
    }
});


router.get('/idcompany',async(req, res)=>{
    let body =  req.body;
    let id = body.idcompany;

    try {
        let company = await Company.findById(id).populate({path:'inpc'});
        res.json({
            ok: true,
            company
        });
    } catch (e) {
        res.status(500).json(e);
    }
});


router.delete('/idcompany/idinpc',async(req, res)=>{
    let body = req.body;
    let id = body.idinpc;
    let idcompany = body.idcompany;

    try {
        let Inpc = await inpc.findByIdAndDelete(id);
        res.json({
            ok: true,
            inpc: Inpc,
            message: "El inpc fue eliminada"
        });
    } catch (e) {
        res.status(500).json(e);
    }
});


module.exports  = router;