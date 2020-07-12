const mongoose = require('mongoose')

//schema for reservations
const resSchema = mongoose.Schema({
    pasaId: String,
    date: String,
    roomId: String,
    estado: Boolean
    
});

module.exports = mongoose.model('reservation', resSchema, 'reservations');