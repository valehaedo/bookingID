const mongoose = require('mongoose')

//schema for reservations
const resSchema = mongoose.Schema({
    pasaId: String,
    date: Date,
    habitacion: String,
    estado: String
    
});

module.exports = mongoose.model('reservation', resSchema, 'reservations');