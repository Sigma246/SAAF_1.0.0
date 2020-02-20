const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {Usuario} = require('../models/SchemaUsuarios');

router.post('/', async(req, res)=>{

    let body = req.body;
    
    let user = await Usuario.findOne({"email": body.email}).populate({
        path: 'companies.permisos',
        model: 'Permisos',
        select: 'permisos'
   }).populate({
        path: 'companies.company',
        model: 'Company'
    });
    console.log(user)
        if(!user) return res.status(400).json('USUARIO y contraseña incorrectos');

    const valipass = await bcrypt.compare(body.password, user.password);
    if(!valipass) return res.status(400).json('usuario y CONTRASEÑA incorrectos');

    let key = user.loginJWT();
    let token = user.tokenJWT();

    res.status(201).header('Authorization', key).json({
        ok: true,
        Access: 'Login success',
        nombre: user.nombre,
        email: user.email,
        permisos: user.permisos,
        token 
    });
});

module.exports = router;