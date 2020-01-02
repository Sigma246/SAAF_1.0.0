function authorize(roles = []){
    if(typeof roles === 'string'){
        roles = [roles]
    }

    return[
        (req, res, next) =>{
             
            for (let x=0;x<req.usuario.permisos.length;x++){
                for (let y=0;y<req.usuario.permisos[x].permisos.length;y++){
                    console.log(req.usuario.permisos[x].permisos[y]);
                    if(roles.includes(req.usuario.permisos[x].permisos[y])){
                      return next();
                    } 
                }
            }
            return res.status(403).send('No tienes el Rol Permitido para acceder a este recurso');
        }
    ]
}

module.exports = authorize