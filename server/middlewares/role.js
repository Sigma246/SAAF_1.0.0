function authorize(roles = []){
    if(typeof roles === 'string'){
        roles = [roles]
    }

    return[
        (req, res, next) =>{
             
            //console.log(req.usuario.companies[0].permisos.permisos[0])

            for (let x=0;x<req.usuario.companies.length;x++){
  
                for (let y=0;y<req.usuario.companies[x].permisos.permisos.length;y++){
                    
                    if(roles.includes(req.usuario.companies[x].permisos.permisos[y])){
                      return next();
                    } 
                }
            }
            return res.status(403).send('No tienes el Rol Permitido para acceder a este recurso');
        }
    ]
}

module.exports = authorize