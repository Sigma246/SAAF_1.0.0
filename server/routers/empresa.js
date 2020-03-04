const express = require('express');
const router = express.Router();
const {Empresa} = require('../models/SchemaEmpresa');
const {Company} = require('../models/SchemaCompany');
const {Ubicacion} = require('../models/SchemaUbicacion');
const {camempleados} = require('../models/SchemaCamposEmpleados');
const {Catalogo} = require('../models/SchemaCatalogos');
const {Depreciacion} = require('../models/SchemaDepreciacion');
const { check, validationResult } = require('express-validator');

router.post('/:idcompany',[
    check('nombre').isLength({ min: 4 }),
    check('nombre_corto').isLength({ min: 4 })
],async(req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    let body = req.body;
    let company = req.params.idcompany;

    try {
        let empresa = new Empresa({
            nombre: body.nombre,
            nombre_corto: body.nombre_corto,
            company
        });
        let empresaDB = await empresa.save();  
       

        res.json({
          ok: true,
          empresa: empresaDB,
        });

        //Crea Directorio de ubicacion para empresa
        let ubicacion = new Ubicacion({
          nombre: empresaDB._id,
          company,
          empresa: empresaDB._id,
          children: []
        });
        let ubicacion_ = await ubicacion.save();

        //Crea Campos default para captura de empleados

        let campos_default = new camempleados({
          campos_extra: [],
          company,
          empresa: empresaDB._id,
          
        });
        let CamposEmpleados = await camempleados.insertMany(campos_default)

        // Crea Campos default para Catalogos
        let Catalogos =[
          {
            nombre: "Aseguradora",clave: "Aseguradora",
            company,
            empresa: empresaDB._id,
            elementos:[
              {clave: "ZURICH",valor: "Zurich Seguros"}
            ]
          },
          {
            nombre: "Estado Físico",clave: "Estado Físico",
            company,
            empresa: empresaDB._id,
            elementos:[
              {clave: "EXCELENT",valor: "Excelente"},
              {clave: "GOOD",valor: "Bueno"},
              {clave: "MEDIUM",valor: "Regular"},
              {clave: "BAD",valor: "Malo"}
            ]
          },
          {
            nombre: "Motívo de baja",clave: "Motívo de baja",
            company,
            empresa: empresaDB._id,
            elementos:[
              {clave: "SELL",valor: "Venta"},
              {clave: "DAMANGE",valor: "Daño"}
            ]
          },
          {
            nombre: "Estatus",clave: "Estatus",
            company,
            empresa: empresaDB._id,
            elementos:[
              {clave: "DEPRECIATING",valor: "Depreciandose"},
              {clave: "NOT_DEPRECIATIONG",valor: "No Depreciandose"},
              {clave: "IN_CONSTRUCTION",valor: "En construcción"}
            ]
          },
          {
            nombre: "Moneda",clave: "Moneda",
            company,
            empresa: empresaDB._id,
            elementos:[
              {clave: "MXN",valor: "Pesos mexicanos"},
              {clave: "USD",valor: "Dolares estadounidenses"},
              {clave: "EUR",valor: "Euros"}
            ]
          },
          {
            nombre: "Condición de compra",clave: "Condición de compra",
            company,
            empresa: empresaDB._id,
            elementos:[
              {clave: "NEW",valor: "Nuevo"},
              {clave: "USED",valor: "Usado"}
            ]
          },
          {
            nombre: "País",clave: "País",
            company,
            empresa: empresaDB._id,
            elementos:[
              {clave: "MEX",valor: "México"},
              {clave: "USA",valor: "Estados Unidos de América"}
            ]
          },
        ]
        let DocumentoCatalogos = await Catalogo.insertMany(Catalogos);

        // Crea Campos default para depreciacion

        let DepreciacionDefault =[
          {
            clave: "DEP-0056",
            nombre: "Fiscal Activos utilizados en restaurantes.",
            criterio: "mes siguiente",
            rangos: {valor: [20,20,20,20,20]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0057",
            nombre: "Fiscal Embarcaciones",
            criterio: "mes siguiente",
            rangos: {valor: [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0058",
            nombre: "Fiscal Construcciones",
            criterio: "mes siguiente",
            rangos: {valor: [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0053",
            nombre: "Fiscal Equipo de la central telefónica destinado a la conmutación de llamadas de tecnología distinta a la electromecánica.",
            criterio: "mes siguiente",
            rangos: {valor: [25,25,25,25]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0054",
            nombre: "Fiscal Lectores de código de barras",
            criterio: "mes siguiente",
            rangos: {valor: [30,30,30,10]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0055",
            nombre: "Fiscal Equipo utilizado en la transmisión y manejo que utiliza el espectro radioeléctrico, tales como el de radiotransmisión de microonda digital o analógica, torres de microondas y guías de onda.",
            criterio: "mes siguiente",
            rangos: {valor: [10,10,10,10,10,10,10,10,10,10]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0050",
            nombre: "Fiscal Activos utilizados en la impresión y publicación gráfica.",
            criterio: "mes siguiente",
            rangos: {valor: [9,9,9,9,9,9,9,9,9,9,9,1]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0051",
            nombre: "Fiscal Activos utilizados en el curtido de piel.",
            criterio: "mes siguiente",
            rangos: {valor: [9,9,9,9,9,9,9,9,9,9,9,1]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0052",
            nombre: "Fiscal Activos utilizados en otras actividades no especificadas.",
            criterio: "mes siguiente",
            rangos: {valor: [25,25,25,25]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0047",
            nombre: "Fiscal Activos utilizados en actividades de agricultura, ganadería, silvicultura y pesca.",
            criterio: "mes siguiente",
            rangos: {valor: [25,25,25,25]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0048",
            nombre: "Fiscal Activos utilizados en la industria de la construcción.",
            criterio: "mes siguiente",
            rangos: {valor: [25,25,25,25]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0049",
            nombre: "Fiscal Segmento satelital en el espacio, incluyendo el cuerpo principal del satélite, los transpondedores, las antenas para la transmisión y recepción de comunicaciones digitales y análogas y el equipo de monitoreo en el satélite.",
            criterio: "mes siguiente",
            rangos: {valor: [8,8,8,8,8,8,8,8,8,8,8,8,4]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0045",
            nombre: "Fiscal Activos utilizados en la elaboración de productos alimenticios y de bebidas, excepto granos, azúcar, aceites comestibles y derivados.",
            criterio: "mes siguiente",
            rangos: {valor: [8,8,8,8,8,8,8,8,8,8,8,8,4]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0046",
            nombre: "Fiscal Otros casos",
            criterio: "mes siguiente",
            rangos: {valor: [10,10,10,10,10,10,10,10,10,10]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0041",
            nombre: "Fiscal Activos destinados directamente a la investigación de nuevos productos o desarrollo tecnológico en el país.",
            criterio: "mes siguiente",
            rangos: {valor: [35,35,30]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0042",
            nombre: "Fiscal Activos utilizados en la construcción de aeronaves y en el transporte terrestre de carga y pasajeros.",
            criterio: "mes siguiente",
            rangos: {valor: [12,12,12,12,12,12,12,12,4]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0043",
            nombre: "Fiscal Activos utilizados en la fabricación de productos de caucho y de plástico.",
            criterio: "mes siguiente",
            rangos: {valor: [9,9,9,9,9,9,9,9,9,9,9,1]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0044",
            nombre: "Fiscal Activos utilizados en la transmisión de los servicios de comunicación proporcionados por telégrafos y por las estaciones de radio y televisión.",
            criterio: "mes siguiente",
            rangos: {valor: [12,12,12,12,12,12,12,12,4]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0038",
            nombre: "Fiscal Activos utilizados en la fabricación de aceites comestibles.",
            criterio: "mes siguiente",
            rangos: {valor: [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0039",
            nombre: "Fiscal Activos utilizados en la manufactura, ensamble y transformación de componentes magnéticos para discos duros y tarjetas electrónicas para la industria de la computación.",
            criterio: "mes siguiente",
            rangos: {valor: [50,50]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0040",
            nombre: "Fiscal Dedicados a la aerofumigación agrícola.",
            criterio: "mes siguiente",
            rangos: {valor: [25,25,25,25]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0035",
            nombre: "Fiscal Activos utilizados en la construcción de ferrocarriles y navíos.",
            criterio: "mes siguiente",
            rangos: {valor: [8,8,8,8,8,8,8,8,8,8,8,4]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0036",
            nombre: "Fiscal Activos utilizados en la fabricación, acabado, teñido y estampado de productos textiles, así como de prendas para el vestido.",
            criterio: "mes siguiente",
            rangos: {valor: [11,11,11,11,11,11,11,11,11,1]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0037",
            nombre: "Fiscal Activos utilizados en la industria minera.",
            criterio: "mes siguiente",
            rangos: {valor: [12,12,12,12,12,12,12,12,4]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0031",
            nombre: "Fiscal Activos utilizados en el transporte marítimo, fluvial y lacustre.",
            criterio: "mes siguiente",
            rangos: {valor: [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0032",
            nombre: "Fiscal Dados, troqueles, moldes, matrices y herramental",
            criterio: "mes siguiente",
            rangos: {valor: [35,35,30]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0033",
            nombre: "Fiscal Activos utilizados en el transporte aéreo.",
            criterio: "mes siguiente",
            rangos: {valor: [16,16,16,16,16,16,4]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0034",
            nombre: "Fiscal Activos utilizados en la fabricación de productos de metal, de maquinaria y de instrumentos profesionales y científicos.",
            criterio: "mes siguiente",
            rangos: {valor: [8,8,8,8,8,8,8,8,8,8,8,8,4]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0028",
            nombre: "Fiscal Vias férreas",
            criterio: "mes siguiente",
            rangos: {valor: [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0029",
            nombre: "Fiscal Activos utilizados en la fabricación de pulpa, papel y productos similares.",
            criterio: "mes siguiente",
            rangos: {valor: [7,7,7,7,7,7,7,7,7,7,7,7,7,7,2]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0030",
            nombre: "Fiscal Activos utilizados en la producción de metal obtenido en primer proceso.",
            criterio: "mes siguiente",
            rangos: {valor: [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0025",
            nombre: "Fiscal Maquinaria y equipo para la generación de energía proveniente de fuentes renovables o de sistemas de cogeneración de electricidad eficiente.",
            criterio: "mes siguiente",
            rangos: {valor: [100]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0026",
            nombre: "Fiscal Equipo satelital en tierra, incluyendo las antenas para la transmisión y recepción de comunicaciones digitales y análogas y el equipo para el monitoreo del satélite.",
            criterio: "mes siguiente",
            rangos: {valor: [10,10,10,10,10,10,10,10,10,10]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0027",
            nombre: "Fiscal Carros de ferrocarril, locomotoras, armones y autoarmones",
            criterio: "mes siguiente",
            rangos: {valor: [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0022",
            nombre: "Fiscal Bombas de suministro a trenes",
            criterio: "mes siguiente",
            rangos: {valor: [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0023",
            nombre: "Fiscal Graficadores",
            criterio: "mes siguiente",
            rangos: {valor: [30,30,30,10]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0024",
            nombre: "Fiscal Automóviles, autobuses, camiones de carga, tractocamiones, montacargas y remolques.",
            criterio: "mes siguiente",
            rangos: {valor: [25,25,25,25]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0020",
            nombre: "Fiscal Otros casos",
            criterio: "mes siguiente",
            rangos: {valor: [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0021",
            nombre: "Fiscal Activos utilizados en la extracción y procesamiento de petroleo crudo y gas natural.",
            criterio: "mes siguiente",
            rangos: {valor: [7,7,7,7,7,7,7,7,7,7,7,7,7,7,2]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0017",
            nombre: "Fiscal Equipo de comunicación, señalización y telemando.",
            criterio: "mes siguiente",
            rangos: {valor: [10,10,10,10,10,10,10,10,10,10]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0018",
            nombre: "Fiscal Lectores ópticos",
            criterio: "mes siguiente",
            rangos: {valor: [30,30,30,10]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0019",
            nombre: "Fiscal Activos utilizados en la producción de azúcar y sus derivados.",
            criterio: "mes siguiente",
            rangos: {valor: [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0014",
            nombre: "Fiscal Unidades de almacenamiento externo y concentradores de redes de computo",
            criterio: "mes siguiente",
            rangos: {valor: [30,30,30,10]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0015",
            nombre: "Fiscal Computadoras personales de escritorio y portátiles.",
            criterio: "mes siguiente",
            rangos: {valor: [30,30,30,10]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0016",
            nombre: "Fiscal Mobiliario y equipo de oficina",
            criterio: "mes siguiente",
            rangos: {valor: [10,10,10,10,10,10,10,10,10,10]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0011",
            nombre: "Fiscal Activos utilizados en la elaboración de productos químicos, petroquímicos y farmacobiológicos.",
            criterio: "mes siguiente",
            rangos: {valor: [9,9,9,9,9,9,9,9,9,9,9,1]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0012",
            nombre: "Fiscal Digitalizadores",
            criterio: "mes siguiente",
            rangos: {valor: [30,30,30,10]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0013",
            nombre: "Fiscal Activos utilizados en la fabricación de vehículos de motor y sus partes.",
            criterio: "mes siguiente",
            rangos: {valor: [8,8,8,8,8,8,8,8,8,8,8,8,4]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-008",
            nombre: "Fiscal Activos utilizados en la fabricación de productos de tabaco y derivados del carbón natural.",
            criterio: "mes siguiente",
            rangos: {valor: [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-009",
            nombre: "Fiscal Adaptaciones que se realicen a instalaciones que impliquen adiciones o mejoras al activo fijo, que tengan como finalidad facilitar a las personas con discapacidad.",
            criterio: "mes siguiente",
            rangos: {valor: [100]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-0010",
            nombre: "Fiscal Activos utilizados en la generación, conducción, transformación y distribución de electricidad.",
            criterio: "mes siguiente",
            rangos: {valor: [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-006",
            nombre: "Fiscal Monumentos con certificado de restauración",
            criterio: "mes siguiente",
            rangos: {valor: [10,10,10,10,10,10,10,10,10,10]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-007",
            nombre: "Fiscal Activos utilizados en la molienda de granos.",
            criterio: "mes siguiente",
            rangos: {valor: [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-005",
            nombre: "Fiscal Activos utilizados en el transporte eléctrico.",
            criterio: "mes siguiente",
            rangos: {valor: [10,10,10,10,10,10,10,10,10,10]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-004",
            nombre: "Fiscal Otros.",
            criterio: "mes siguiente",
            rangos: {valor: [10,10,10,10,10,10,10,10,10,10]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-001",
            nombre: "Fiscal Maquinaria niveladora de vìas, desclavadoras, esmeriles para vìas, gatos de motor para levantar la vìa, removedora, insertadora y taladradora de durmientes.",
            criterio: "mes siguiente",
            rangos: {valor: [7,7,7,7,7,7,7,7,7,7,7,7,7,7,2]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-002",
            nombre: "Fiscal Semovientes y vegetales",
            criterio: "mes siguiente",
            rangos: {valor: [100]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-003",
            nombre: "Fiscal Impresoras",
            criterio: "mes siguiente",
            rangos: {valor: [30,30,30,10]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          },
          {
            clave: "DEP-000",
            nombre: "Fiscal Torres de transmisión y cables, excepto los de fibra óptica",
            criterio: "mes siguiente",
            rangos: {valor: [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]},
            meses: 12,
            company,
            empresa: empresaDB._id,
          }
        ]
        let depreciacion = await Depreciacion.insertMany(DepreciacionDefault);
       
    } catch (e) {
        res.status(500).json(e);
    }
}); 


router.get('/:idcompany',async(req, res)=>{
  let body = req.body;
  let company= req.params.idcompany;

  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 10;
  limite = Number(limite);

    try {
      let empresa = await Empresa.find({'company': company}).skip(desde).limit(limite);
      res.json({
        ok: true,
        empresa
      });
    } catch (e) {
      res.status(500).json(e);
    }
  });

router.get('/:idCompany/:idEmpresa',async(req, res)=>{
    
    let id = req.params.idEmpresa;
    try {
        let empresa = await Empresa.findById({_id: id });  
        res.json({
        ok: true,
        empresa
        });
    } catch (e) {
        res.status(500).json(e);
    }
}); 

router.put('/:idCompany/:idEmpresa',async(req, res)=>{
  let body = req.body;  
  let idempresa = req.params.idEmpresa;
  let idcompany = req.params.idCompany;
    
    try {  
      let empresa = await Empresa.findByIdAndUpdate({_id: idempresa,company: idcompany },{$set:{
        'nombre':body.nombre, 
        'nombre_corto':body.nombre_corto, 
        'estado':body.estado
      }});  
      res.json({
        ok: true,
        message: "Empresa Actualizada",
        empresa
      });
    } catch (e) {
      res.status(500).json(e);
    }
  });


  router.delete('/:idCompany/:idEmpresa',async(req, res)=>{
    let body = req.body;
    let idcompany = req.params.idCompany;
    let idempresa = req.params.idEmpresa;
    try {
      let empresa = await Empresa.findOneAndDelete({_id: idempresa, company: idcompany });  
      res.json({
      ok: true,
      message: "Empresa Eliminada",
      empresa
      });
    } catch (e) {
      res.status(500).json(e);
    }
  });

module.exports = router;