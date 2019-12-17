const jwt = require('jsonwebtoken');

let verificarLogin = async(req, res, next)=>{
    let token = req.get('Authorization');
   
    try {
        let very = await jwt.verify(token, process.env.NODE_FIRM_SAaf );
        req.usuario = very;
        next();
    } catch (err) {
        res.status(401).json({
            ok: false,
            confirmation: 'success failed',
        });
    }
};


module.exports ={
    verificarLogin
}