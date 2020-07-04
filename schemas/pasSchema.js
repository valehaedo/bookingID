const mongoose = require('mongoose');

//schema for pasajeros
const pasSchema = mongoose.schema({
    nombre: String,
    apellido: String,
    pasaporte: Number
    
});

module.exports = mongoose.model('pasajero', pasSchema, 'pasajeros');