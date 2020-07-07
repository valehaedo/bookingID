const mongoose = require('mongoose');

//schema for pasajeros
const pasSchema = mongoose.Schema({
    nombre: String,
    apellido: String,
    pasaporte: Number
    
});

module.exports = mongoose.model('pasajero', pasSchema);