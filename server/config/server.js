// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;


// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ============================
//  Caducidad TOKENS
// ============================
process.env.NODE_EXP = 60*60*24*30;

// ============================
//  Firma TOKENS
// ============================
process.env.NODE_FIRM_SAaf = process.env.NODE_FIRM_SAaf || 'Firma_Sigma246_SAAF';
process.env.NODE_FIRM_data = process.env.NODE_FIRM_data || 'Firma_data_SAAF';

// ============================
//  Base de datos
// ============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb+srv://sigma:Awd2009302321@mongodb-mkexd.azure.mongodb.net/saaf?retryWrites=true&w=majority';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;
