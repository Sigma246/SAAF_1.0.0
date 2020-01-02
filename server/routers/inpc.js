const express = require('express');
const router = express.Router();
const {inpc} = require('../models/SchemaInpc');
const {Company} = require('../models/SchemaCompany');
const { check, validationResult } = require('express-validator');

router.post('/post/:idcompany',[
    check('year').isLength({ min: 2 })]
    ,async(req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
    }
        
    let body = req.body;
    let idcompany = req.params.idcompany;
   
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
        
        res.json({
            ok: true,
            inpc: inpcdb,
          });
    } catch (e) {
        res.status(500).json(e);
    }
});


router.put('/put/:idcompany/:idinpc',[
    check('year').isLength({ min: 2 })]
    ,async(req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
    }
        
    let body = req.body;
    let id = req.params.idinpc;
    let company = req.params.idcompany;
   
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

        let inpcdb = await inpc.findOneAndUpdate({_id: id, company},Inpc);
        
        res.json({
            ok: true,
            inpc: inpcdb,
            message: "El inpc fue actualizado"
          });
    } catch (e) {
        res.status(500).json(e);
    }
});



router.get('/get/:idcompany/:idinpc',async(req, res)=>{
    let id = req.params.idinpc;
    let company = req.params.idcompany;

    try {
        let Inpc = await inpc.findOne({_id: id, company});
        res.json({
            ok: true,
            inpc: Inpc
        });
    } catch (e) {
        res.status(500).json(e);
    }
});


router.get('/get/:idcompany',async(req, res)=>{
    let company = req.params.idcompany;

    let year = req.query.shearch_year;

    let filtro = req.query.filtro_year || -1;
    filtro = Number(filtro);

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);

    try {
        let Inpc;
        if (typeof year == 'undefined') {
            Inpc = await inpc.find({'company': company},).sort({'year':filtro}).skip(desde).limit(limite);    
        } else {
            Inpc = await inpc.find({'company': company, year},).sort({'year':filtro}).skip(desde).limit(limite);    
        }
        res.json({
            ok: true,
            Inpc
        });
    } catch (e) {
        res.status(500).json(e);
    }
});


router.delete('/delete/:idcompany/:idinpc',async(req, res)=>{
    let id = req.params.idinpc;
    let company = req.params.idcompany;

    try {
        let Inpc = await inpc.findOneAndDelete({_id: id, company});
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