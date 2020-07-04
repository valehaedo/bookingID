const mongoose = require('mongoose')

//schema for reservations
const resSchema = mongoose.Schema({
    nombre: String,
    apellido: String,
    pasaporte: Number,
    date: Date,
    habitacion: Number
    
});

module.exports = mongoose.model('reservation', resSchema, 'reservations');